const fs = require('fs');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'echis'
});

// Function to append logs to logs.json file
function appendToLogs(log) {
  const logEntry = { timestamp: new Date().toISOString(), message: log };
  fs.appendFile('logs.json', JSON.stringify(logEntry) + '\n', (err) => {
    if (err) {
      console.error('Error appending to logs.json:', err);
    }
  });
}

// Read the JSON file containing the fetched data
fs.readFile('fetched_documents.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    appendToLogs('Error reading JSON file: ' + err.message);
    return;
  }

  try {
    const documents = JSON.parse(data);

    connection.connect();

    documents.forEach(doc => {
      const { chu_id, fields } = doc;
      const data_elements = Object.keys(fields).filter(key => key !== 'inputs');

      if (data_elements.length === 0) {
        const skipMessage = 'Skipping document with no valid data elements: ' + doc._id;
        console.log(skipMessage);
        appendToLogs(skipMessage);
        return;
      }

      data_elements.forEach(element => {
        const value = fields[element];
        if (value === '0' || value === 'NaN') {
          const skipValueMessage = 'Skipping data element with invalid value: ' + element;
          console.log(skipValueMessage);
          appendToLogs(skipValueMessage);
          return;
        }

        const sql = `INSERT INTO approvals (chu_id, approval_status, data_elements, value, date_created) VALUES (?, ?, ?, ?, NOW())`;

        connection.query(sql, [chu_id, 'pending', element, value], (error, results) => {
          if (error) {
            const errorMessage = 'Error inserting data: ' + error.message;
            console.error(errorMessage);
            appendToLogs(errorMessage);
          } else {
            const successMessage = 'Data inserted successfully: ' + JSON.stringify(results);
            console.log(successMessage);
            appendToLogs(successMessage);
          }
        });
      });
    });
  } catch (error) {
    const parseErrorMessage = 'Error parsing JSON data: ' + error.message;
    console.error(parseErrorMessage);
    appendToLogs(parseErrorMessage);
  } finally {
    connection.end();
  }
});
