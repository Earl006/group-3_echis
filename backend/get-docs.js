const http = require('http');

const couchDBHost = 'localhost';
const couchDBPort = 5984;
const databaseName = 'medic';
const username = 'medic'; // Replace with your actual username
const password = 'password'; // Replace with your actual password

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
      'Accept': 'application/json',
      'Host': `${couchDBHost}:${couchDBPort}`
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

// Example usage: Get all documents in the "medic" database
getAllDocuments((error, documents) => {
  if (error) {
    console.error('Error fetching documents:', error);
  } else {
    console.log('Fetched documents:', documents);
  }
});
