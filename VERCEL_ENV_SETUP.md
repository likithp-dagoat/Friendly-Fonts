# Quick Vercel Environment Variables Setup

## Copy-Paste Values for Vercel Dashboard

Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

### 1. GOOGLE_SERVICE_ACCOUNT_EMAIL
```
friendlyfontswaitlist@friendlyfonts.iam.gserviceaccount.com
```

### 2. GOOGLE_PRIVATE_KEY
Copy this ENTIRE value (including the quotes):
```
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDobYRdhIs8z4lf\n8jgK/tfMTi9e92f+gxzgaMIXCnG4Drzl7nLvE9+/uPfdLOEX0k5BWfdpYxsqa79h\nwTiyn/OgY5XvOsk0B/6jQ5cfUU/z7xQpj8vA1tlke9resw8e+ABEZVFikOsUhMuL\nboYt66xOMm5+A2sdmucfAmBY2REpegxGND2EbnA/pqiHXoSAdrs9KH1+mFOYm2bU\nlYfmcqD1jpL26A1BFQRU3dl3TLujQjD8bYC9JXz31ckKZwtFF8212nnr+Pdc7KIb\nOCeG/SH25AKxR9DMIfQL3VKJG3OuVcxfOM4lEUV4o93S+OQHQ69JrOR3KK+hQWMO\nZh4SQQQBAgMBAAECggEAENcL1cFqW9qRknu4kcYLGUi6PUA3BFq4NzjVLy7Y3xlk\n7afheJmmXCa+Vq5kv1bDyA+zpwAWPMmXu9vFtt4d8bX6wV2ErG9pL1JmBaUyN3NQ\nBlQz0rdTrZMdCtugXIG4IJHSsWMx6nJV/mE1+ZJvZoRYOxXA/LZ3c74MAFlMhAZU\nsc7XNWhrFNRJUpAPM8vgwpC0hrD3kksaIhwJFGHTzG03emSqEmKLsTHjjW5ePvIr\nDaTDYaoNtjArHcp1YYvU1sNOve5CYYfHKLZ+aj6OCJu0z/HM+SAWPTdVqYBU7Iel\naQooMdiRQTF597zbhcUuFsbeBfHR891IH/ltzktWDQKBgQD+0ozejktD7NZhg0Oe\nRUSOihsLPG4yaIr4h1T0g88olrKp0Da4k2jvgqrK9NGVjpE9XjFiR+DresbKGtAA\ndMImhowdxPeTNwZt725D1UqQ2yIoKh1doF4rGdIXuhJR0wX6owRyqifW13wps7ee\nq+qxCvH87yIAdo0nBIHiy7RGiwKBgQDpgHlvhH1TipOP/MCSGQdD6Y1XsY89UQ8Y\nkVFwxKiZqFMVQW0a3MJqV5Ygrede8Vr+zmzyBzTlJkOZYftUkUManimiscwNxZCf\npf5gX+ToPfhyC0+jA6rycVIvyIMwFFJbP/mPlBozWvlY3uQ4Szm7FsO0AAKqC0cY\njLXJrSz9IwKBgQCzvKtkJ5XrGVi1ezLspgsPR1Z//GX15EtxtXM07OvnwzPOF3Eh\ni8hOeCoj8b8K8H59fLz0h6KcNgOVdogUakavieO288F08zDzxhhOfFmWBxr2nY4N\nBhql6BaKadKWKHRlLyrp/h8PqPqJJ5xyrOxjaEb7k2i2TuiNBt7eq7RCtQKBgCsD\n0NsbVB8UszReQndnhvAa0T/rZNDN4vMKqi8U+147JPsQb3H4YxRGCFEC2FGkMrgn\n/OflLfhcwS07YJpmnC8GHfNrv4R19buDT8YfREMIT4Fq1gPYxCAfgh1tWcV8qONI\neMfbZ6w4QSD/BpncOcleWzUIn3UF2NYL7d02OshzAoGANXJjTXu2VMfstsC0TAJT\n8Xoiixn1dmnxJ0uwv1smp+OLTbAauBPGWQsJZFjfBTCP0E2OT3iaFBa3z3IfhpNQ\ni8k0fgOpuZVi2ncXrZ28c6yryis1N7RSvPy+rtjEthccnAx1L2tB6e4Y56cYtA+7\nHvZlN1v6wpuB4DBTbZ+xbuM=\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- Include the quotes at the beginning and end
- Keep all the `\n` characters (don't replace them with actual line breaks)
- Select **ALL environments** (Production, Preview, Development)

### 3. GOOGLE_PROJECT_ID
```
friendlyfonts
```

## After Adding Variables

1. **Redeploy** your application:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

2. **Test the connection:**
   - Visit: `https://your-app.vercel.app/api/test-sheets`
   - Should return success message

3. **Test the waitlist:**
   - Submit an email via the waitlist form
   - Check your Google Sheet: https://docs.google.com/spreadsheets/d/1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0

## Troubleshooting

**Still getting "Server configuration error"?**
- Make sure you copied the ENTIRE private key value (including quotes)
- Make sure `\n` characters are preserved (not converted to actual newlines)
- Make sure you selected ALL environments when adding variables
- Redeploy after adding variables

**403 Forbidden error?**
- Make sure the spreadsheet is shared with: `friendlyfontswaitlist@friendlyfonts.iam.gserviceaccount.com`
- Give it **Editor** permissions

