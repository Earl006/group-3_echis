const express = require('express');
const http = require('http');

const app = express();
const port = 3000;

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
      const medicAdminDoc = documents.filter(doc => doc._id === 'c1e7a481-a381-4801-89e7-23af6560f9b5');

      callback(null, medicAdminDoc);
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Fetch the Medic-Admin document upon server start
getAllDocuments((error, medicAdminDoc) => {
  if (error) {
    console.error('Error fetching documents:', error);
  } else {
    console.log('Fetched medic-admin document:', medicAdminDoc);
  }
});

// Route to fetch the Medic-Admin document
app.get('/get-medic-admin-doc', (req, res) => {
  getAllDocuments((error, medicAdminDoc) => {
    if (error) {
      console.error('Error fetching documents:', error);
      res.status(500).send('Error fetching document');
    } else {
      res.json(medicAdminDoc);
    }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
