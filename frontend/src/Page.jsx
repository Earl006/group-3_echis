import React, { useState, useEffect } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5010/api/data'); // Assuming your backend is running on port 5010
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLogs = async () => {
    const history = useHistory(); // Initialize useHistory hook
    try {
      const response = await fetch('/backend/logs.json'); // Fetch logs.json from local file system
      const logsJson = await response.json();
      setLogsData(logsJson);
      setShowLogs(true);
      history.push('/logs'); // Navigate to '/logs' route after fetching logs
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  const handleApproveAll = () => {
    const updatedData = data.map((item) => ({
      ...item,
      approval_status: 'approved',
    }));
    setData(updatedData);
  };

  return (
    <div>
      <h1>Data Display</h1>
      <button onClick={fetchLogs}>LOGS</button>
      <button onClick={handleApproveAll}>Approve All</button>
      {showLogs && (
        <div>
          <h2>Logs Data</h2>
          <pre>{JSON.stringify(logsData, null, 2)}</pre>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>CHU ID</th>
            <th>Data Elements</th>
            <th>Value</th>
            <th>Date Created</th>
            <th>Sync</th>
            <th>Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: '8px' }}>{item.id}</td>
              <td style={{ padding: '8px' }}>{item.chu_id}</td>
              <td style={{ padding: '8px' }}>{item.data_elements}</td>
              <td style={{ padding: '8px' }}>{item.value}</td>
              <td style={{ padding: '8px' }}>{item.date_created}</td>
              <td style={{ padding: '8px' }}>{item.sync}</td>
              <td style={{ padding: '8px' }}>{item.approval_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
