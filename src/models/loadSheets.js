const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.loadUsers = async function () {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    '1pQ8_-hjGb7U80u69Arom9vFVqZMxG-LkQ8hQawl6eEo'
  );
  // Service account details
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  // Load the document info
  await doc.loadInfo();
  // Set sheet to work with
  const sheet = doc.sheetsByIndex[0];
  // Return the sheet object
  return sheet;
};
