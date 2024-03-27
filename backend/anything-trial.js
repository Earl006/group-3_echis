const http = require('http');

// Replace these with your actual CouchDB credentials and database name
const couchDBHost = 'localhost';
const couchDBPort = 5984;
const databaseName = 'medic';
const username = 'medic'; // Replace with your actual username
const password = 'password'; // Replace with your actual password

// Function to make a GET request to CouchDB with basic authentication
function getAllDocuments(callback) {
  const auth = `${username}:${password}`;
  const encodedAuth = Buffer.from(auth).toString('base64');

  const options = {
    hostname: couchDBHost,
    port: couchDBPort,
    path: `/${databaseName}/_all_docs?include_docs=true`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${encodedAuth}`,
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(data);
      const documents = parsedData.rows.map(row => row.doc); // Extracting actual documents from rows

      // Filter documents to include only those with _id equal to '_design/medic-admin'
      const medicAdminDoc = documents.filter(doc => doc._id === '_design/medic-admin');

      callback(null, medicAdminDoc);
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Example usage: Get the document with _id equal to '_design/medic-admin'
getAllDocuments((error, medicAdminDoc) => {
    if (error) {
        console.error('Error fetching documents:', error);
    } else {
        console.log('Fetched medic-admin document:', medicAdminDoc);
    }
});
