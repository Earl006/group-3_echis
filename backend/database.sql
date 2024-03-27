CREATE DATABASE echis;
CREATE TABLE approvals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chu_id VARCHAR(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sync BOOLEAN DEFAULT FALSE,
    approval_status TEXT
);
SELECT * FROM approvals;