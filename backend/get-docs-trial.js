const http = require('http');
const fs = require('fs');

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
      const parsedData = JSON.parse(data);
      const documents = parsedData.rows.map(row => row.doc); // Extracting actual documents from rows

      // Write the fetched documents to a JSON file
      fs.writeFile('fetched_documents.json', JSON.stringify(documents, null, 2), (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Data saved to fetched_documents.json');
        }
      });
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Example usage: Get all documents in the "medic" database and save them to a JSON file
getAllDocuments((error, result) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(result);
  }
});
