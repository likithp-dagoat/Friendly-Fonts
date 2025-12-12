// Automated setup script for Google Sheets integration
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SPREADSHEET_ID = '1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0';

// Load .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    console.log('Run: powershell -ExecutionPolicy Bypass -File setup-env.ps1');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split(/\r?\n/);
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    
    // Handle multi-line values (for private key)
    if (line.includes('GOOGLE_PRIVATE_KEY=')) {
      const keyMatch = line.match(/^([^=]+)="?(.*)$/);
      if (keyMatch) {
        const key = keyMatch[1].trim();
        let value = keyMatch[2];
        
        // Continue reading until we find the closing quote
        while (!value.includes('"\n') && !value.endsWith('"') && i + 1 < lines.length) {
          i++;
          value += '\n' + lines[i];
        }
        
        // Remove quotes if present
        value = value.trim();
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        process.env[key] = value;
        continue;
      }
    }
    
    // Regular key=value pairs
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

async function setupSheets() {
  console.log('🔧 Setting up Google Sheets integration...\n');
  
  loadEnv();

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const projectId = process.env.GOOGLE_PROJECT_ID;

  if (!email || !privateKey || !projectId) {
    console.error('❌ Missing environment variables in .env.local');
    process.exit(1);
  }

  console.log('✓ Environment variables loaded');
  console.log(`  Service Account: ${email}\n`);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, '\n'),
      project_id: projectId,
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  try {
    // Test connection
    console.log('📊 Testing spreadsheet connection...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    console.log('✓ Successfully connected!');
    console.log(`  Title: ${spreadsheet.data.properties?.title}\n`);

    // Check Sheet1
    const sheet1 = spreadsheet.data.sheets?.find(
      (s) => s.properties?.title === 'Sheet1'
    );

    if (!sheet1) {
      console.log('⚠️  Sheet1 not found. Creating...');
      // Would need to create it via API, but let's just warn
      console.log('  Please ensure your sheet has a tab named "Sheet1"\n');
    } else {
      console.log('✓ Sheet1 found');
      
      // Check headers
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1:B1',
      });

      const headers = headerResponse.data.values?.[0] || [];
      
      if (headers.length === 0 || headers[0] !== 'Email') {
        console.log('📝 Adding headers to Sheet1...');
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Sheet1!A1:B1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [['Email', 'Timestamp']],
          },
        });
        console.log('✓ Headers added: Email, Timestamp\n');
      } else {
        console.log(`✓ Headers found: ${headers.join(', ')}\n`);
      }
    }

    // Try to check permissions (this might fail if not shared)
    console.log('🔐 Checking permissions...');
    try {
      await drive.permissions.list({
        fileId: SPREADSHEET_ID,
      });
      console.log('✓ Permissions accessible\n');
    } catch (permError) {
      // This is expected if we don't have permission to list permissions
    }

    // Try to share the spreadsheet
    console.log('🔗 Attempting to share spreadsheet with service account...');
    try {
      await drive.permissions.create({
        fileId: SPREADSHEET_ID,
        requestBody: {
          role: 'writer',
          type: 'user',
          emailAddress: email,
        },
        sendNotificationEmail: false,
      });
      console.log('✅ Successfully shared spreadsheet with service account!\n');
    } catch (shareError) {
      if (shareError.code === 403) {
        console.log('⚠️  Cannot auto-share (requires owner access)');
        console.log('\n📋 Manual sharing required:');
        console.log(`   1. Open: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
        console.log('   2. Click "Share" (top right)');
        console.log(`   3. Add: ${email}`);
        console.log('   4. Set permission to "Editor"');
        console.log('   5. Uncheck "Notify people"');
        console.log('   6. Click "Share"\n');
      } else if (shareError.code === 400 && shareError.message.includes('already')) {
        console.log('✅ Spreadsheet is already shared with service account!\n');
      } else {
        console.log('⚠️  Could not auto-share:', shareError.message);
        console.log('\n📋 Please share manually (see instructions above)\n');
      }
    }

    // Final test - try to write
    console.log('🧪 Running final connection test...');
    const testEmail = `test-${Date.now()}@example.com`;
    const testTimestamp = new Date().toISOString();
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[testEmail, testTimestamp]],
      },
    });

    console.log('✅ Test write successful!');
    console.log('   (You can delete the test row from your sheet)\n');

    console.log('🎉 Setup complete! Your waitlist is ready to use.');
    console.log('\n📌 Summary:');
    console.log(`   Spreadsheet: ${spreadsheet.data.properties?.title}`);
    console.log(`   Spreadsheet ID: ${SPREADSHEET_ID}`);
    console.log(`   Service Account: ${email}`);
    console.log('\n✨ You can now use the waitlist form on your website!');

  } catch (error) {
    console.error('\n❌ Setup failed!\n');

    if (error.code === 403) {
      console.error('Error: Permission denied');
      console.error('\nThe spreadsheet needs to be shared with the service account.');
      console.error('\n📋 To fix this:');
      console.error(`   1. Open: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
      console.error('   2. Click "Share" button (top right)');
      console.error(`   3. Add this email: ${email}`);
      console.error('   4. Set permission to "Editor"');
      console.error('   5. Uncheck "Notify people" (optional)');
      console.error('   6. Click "Share"');
      console.error('\nThen run this script again to verify the connection.');
    } else if (error.code === 404) {
      console.error('Error: Spreadsheet not found');
      console.error('   Check that the spreadsheet ID is correct:', SPREADSHEET_ID);
    } else {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Details:', JSON.stringify(error.response.data, null, 2));
      }
    }
    process.exit(1);
  }
}

setupSheets();

