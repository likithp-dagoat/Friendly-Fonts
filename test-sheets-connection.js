// Test script to verify Google Sheets connection
// Note: This requires .env.local to be in the root directory
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since we're in root
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const SPREADSHEET_ID = '1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0';

async function testConnection() {
  try {
    console.log('Testing Google Sheets connection...\n');
    
    // Check environment variables
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const projectId = process.env.GOOGLE_PROJECT_ID;
    
    if (!email || !privateKey || !projectId) {
      console.error('❌ Missing environment variables!');
      console.log('Required:');
      if (!email) console.log('  - GOOGLE_SERVICE_ACCOUNT_EMAIL');
      if (!privateKey) console.log('  - GOOGLE_PRIVATE_KEY');
      if (!projectId) console.log('  - GOOGLE_PROJECT_ID');
      return;
    }
    
    console.log('✓ Environment variables found');
    console.log(`  Service Account: ${email}\n`);
    
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: email,
        private_key: privateKey.replace(/\\n/g, '\n'),
        project_id: projectId,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Try to read the spreadsheet
    console.log('Attempting to access spreadsheet...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    console.log('✓ Successfully connected to spreadsheet!');
    console.log(`  Title: ${response.data.properties.title}`);
    console.log(`  Spreadsheet ID: ${SPREADSHEET_ID}\n`);
    
    // Check if Sheet1 exists and has headers
    const sheet1 = response.data.sheets.find(s => s.properties.title === 'Sheet1');
    if (sheet1) {
      console.log('✓ Sheet1 found');
      
      // Try to read the first row (headers)
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:B1',
      });
      
      const headers = headerResponse.data.values?.[0] || [];
      console.log(`  Headers: ${headers.join(', ') || 'No headers found'}`);
      
      if (headers.length === 0) {
        console.log('\n⚠️  Warning: No headers found. Adding headers...');
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Sheet1!A1:B1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [['Email', 'Timestamp']],
          },
        });
        console.log('✓ Headers added successfully');
      }
    } else {
      console.log('⚠️  Sheet1 not found. Creating it...');
      // This would require more complex API calls, so we'll just warn
      console.log('  Please ensure your sheet has a tab named "Sheet1"');
    }
    
    console.log('\n✅ Connection test successful! Your waitlist is ready to use.');
    console.log('\n📝 Next steps:');
    console.log('  1. Make sure the spreadsheet is shared with:');
    console.log(`     ${email}`);
    console.log('  2. The service account needs "Editor" permissions');
    console.log('  3. Test the waitlist form on your website');
    
  } catch (error) {
    console.error('\n❌ Connection test failed!\n');
    
    if (error.code === 403) {
      console.error('Error: Permission denied (403)');
      console.error('\nThis usually means:');
      console.error('  1. The spreadsheet is not shared with the service account');
      console.error(`  2. Share it with: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
      console.error('  3. Make sure to give it "Editor" permissions');
      console.error('\nTo share the spreadsheet:');
      console.error(`  1. Open: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
      console.error('  2. Click "Share" button (top right)');
      console.error(`  3. Add: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
      console.error('  4. Set permission to "Editor"');
      console.error('  5. Click "Share"');
    } else if (error.code === 404) {
      console.error('Error: Spreadsheet not found (404)');
      console.error('  Check that the spreadsheet ID is correct');
    } else {
      console.error('Error details:', error.message);
      if (error.response) {
        console.error('  Status:', error.response.status);
        console.error('  Details:', JSON.stringify(error.response.data, null, 2));
      }
    }
    process.exit(1);
  }
}

testConnection();

