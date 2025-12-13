import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SPREADSHEET_ID = '1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0';

async function getAuth() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  
  // Handle different formats of private key
  if (privateKey) {
    // Remove surrounding quotes if present (single or double)
    privateKey = privateKey.trim();
    if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
        (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
      privateKey = privateKey.slice(1, -1);
    }
    
    // Replace escaped newlines with actual newlines
    // Handle both \\n (double escaped) and \n (single escaped)
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // If it still doesn't have newlines but has literal \n, try one more time
    if (!privateKey.includes('\n') && privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    // Ensure the key has proper BEGIN/END markers
    if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
      throw new Error('Invalid private key format: missing BEGIN/END markers');
    }
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth;
}

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const projectId = process.env.GOOGLE_PROJECT_ID;

    if (!email || !privateKey || !projectId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing environment variables',
          missing: [
            !email && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
            !privateKey && 'GOOGLE_PRIVATE_KEY',
            !projectId && 'GOOGLE_PROJECT_ID',
          ].filter(Boolean),
        },
        { status: 500 }
      );
    }

    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Try to access the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    // Check if Sheet1 exists and has headers
    const sheet1 = spreadsheet.data.sheets?.find(
      (s) => s.properties?.title === 'Sheet1'
    );

    let headers: string[] = [];
    if (sheet1) {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:B1',
      });
      headers = headerResponse.data.values?.[0] || [];
    }

    // If no headers, add them
    if (headers.length === 0 && sheet1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:B1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Email', 'Timestamp']],
        },
      });
      headers = ['Email', 'Timestamp'];
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Google Sheets!',
      spreadsheet: {
        id: SPREADSHEET_ID,
        title: spreadsheet.data.properties?.title,
        sheet1: sheet1 ? {
          exists: true,
          headers: headers,
        } : { exists: false },
      },
      serviceAccount: email,
      nextSteps: [
        `Share the spreadsheet with: ${email}`,
        'Give it "Editor" permissions',
        'The waitlist is ready to use!',
      ],
    });
  } catch (error: any) {
    console.error('Test connection error:', error);

    if (error.code === 403) {
      return NextResponse.json(
        {
          success: false,
          error: 'Permission denied',
          message: 'The spreadsheet is not shared with the service account',
          serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          instructions: [
            `1. Open: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`,
            `2. Click "Share" button (top right)`,
            `3. Add: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`,
            '4. Set permission to "Editor"',
            '5. Click "Share"',
          ],
        },
        { status: 403 }
      );
    }

    if (error.code === 404) {
      return NextResponse.json(
        {
          success: false,
          error: 'Spreadsheet not found',
          message: 'Check that the spreadsheet ID is correct',
          spreadsheetId: SPREADSHEET_ID,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Connection test failed',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

