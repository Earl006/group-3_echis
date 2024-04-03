#Running and operation of the solution

Set up echis system and expose port 5984 where couchDB is running, this can be done by editing docker-compose.yml
Create a MySQL database called echis on your machine and run backend/database.js using
``` node backend/database.js```
This will fetch data from the couchDB and map it onto the echis mySQL database. It will also create a file fetched_documents.json and add a copy of the files . Logs are generated and saved in logs.json.

After this run 
```node server.js```
 this runs the node server allowing you to access the database. in the frontend directory run
 ```npm run dev``` 
 this is the react frontend that displays cleaned data from the MySQL database.