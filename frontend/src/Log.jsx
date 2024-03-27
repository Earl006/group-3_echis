import React from 'react';

const Logs = ({ logsData }) => {
  // Parse the logsData JSON string into an array of objects
  const logsArray = logsData.split('\n').map((line) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return null;
    }
  }).filter(Boolean); // Filter out any null values from parsing errors

  return (
    <div>
      <h2>Logs Data</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logsArray.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
