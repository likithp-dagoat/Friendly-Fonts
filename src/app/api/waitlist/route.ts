import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SPREADSHEET_ID = '1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0';

async function getAuth() {
  // For service account authentication
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  
  // Handle different formats of private key
  // Replace escaped newlines with actual newlines
  if (privateKey) {
    // Handle both \\n (double escaped) and \n (single escaped)
    privateKey = privateKey.replace(/\\n/g, '\n');
    // Also handle if it's already in the right format
    if (!privateKey.includes('\n') && privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Validate that credentials are set
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const projectId = process.env.GOOGLE_PROJECT_ID;

    const missingVars = [];
    if (!email || email.trim() === '') missingVars.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    if (!privateKey || privateKey.trim() === '') missingVars.push('GOOGLE_PRIVATE_KEY');
    if (!projectId || projectId.trim() === '') missingVars.push('GOOGLE_PROJECT_ID');

    if (missingVars.length > 0) {
      console.error('Google Sheets credentials not configured.');
      console.error('Missing variables:', missingVars.join(', '));
      console.error('Environment check:', {
        hasEmail: !!email,
        hasPrivateKey: !!privateKey,
        hasProjectId: !!projectId,
        emailLength: email?.length || 0,
        privateKeyLength: privateKey?.length || 0,
        projectIdLength: projectId?.length || 0,
      });
      
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          message: `Missing environment variables: ${missingVars.join(', ')}. ${process.env.NODE_ENV === 'production' ? 'Please configure these in your Vercel project settings.' : 'Please check your .env.local file and restart the server.'}`
        },
        { status: 500 }
      );
    }

    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Get the current date/time
    const timestamp = new Date().toISOString();

    // Append the email and timestamp to the sheet
    // Assuming the sheet has headers in row 1: Email, Timestamp
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:B', // Adjust if your sheet name is different
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp]],
      },
    });

    return NextResponse.json(
      { message: 'Successfully added to waitlist' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error adding to waitlist:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to add to waitlist. Please try again.';
    
    if (error.code === 403) {
      errorMessage = 'Permission denied. The spreadsheet may not be shared with the service account.';
    } else if (error.code === 401) {
      errorMessage = 'Authentication failed. Please check your Google service account credentials.';
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

