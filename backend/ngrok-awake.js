const https = require('https');

// URL to be invoked every 30 seconds
const urlToInvoke = 'https://84dd-102-213-241-162.ngrok-free.app/';

// Function to invoke the URL
function invokeURL() {
  https.get(urlToInvoke, (res) => {
    console.log(`URL invoked successfully. Response status code: ${res.statusCode}`);
  }).on('error', (error) => {
    console.error('Error invoking URL:', error);
  });
}

// Set interval to invoke the URL every 30 seconds
const intervalId = setInterval(invokeURL, 600 * 1000); // 600 seconds in milliseconds

// Function to stop the interval (e.g., when program is stopped)
function stopInterval() {
  clearInterval(intervalId);
  console.log('Interval stopped. Program is stopped.');
}

// // Example: Stop the interval after 5 minutes (for demonstration purposes)
// setTimeout(stopInterval, 5 * 60 * 1000); // 5 minutes in milliseconds
