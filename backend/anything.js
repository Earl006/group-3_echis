const http = require('http');

// Replace these with your actual CouchDB credentials and database name
const couchDBHost = 'localhost';
const couchDBPort = 5984;
const databaseName = 'medic';

// Function to make a GET request to CouchDB
function getAllDocuments(callback) {const http = require('http');

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
      callback(null, JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Example usage: Get all documents in the database
getAllDocuments((error, documents) => {
  if (error) {
    console.error('Error fetching documents:', error);
  } else {
    console.log('Fetched documents:', documents);
  }
});

  const options = {
    hostname: couchDBHost,
    port: couchDBPort,
    path: `/${databaseName}/_all_docs?include_docs=true`, // Include_docs=true to get the actual documents
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Example usage: Get all documents in the database
getAllDocuments((error, documents) => {
  if (error) {
    console.error('Error fetching documents:', error);
  } else {
    console.log('Fetched documents:', documents);
  }
});
