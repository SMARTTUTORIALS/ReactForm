# This project is built with React JS

There are three servers that are required. These can run on the same machine in different ports.

1. frontend (React Js)
2. backend (node & express)
3. database (mongodb)

## Prerequisite

1. Create a file named `.env` inside `reactform` folder.
2. Inside the `.env` file create an entry like below which is for running backend api requests from the frontend
    REACT_APP_BASE_URL_DB = "base url for the api"

3. Inside the `.env` file create another entry like below which is for connecting to the database
    DB_CONNECTION_STRING = "base url or connection string from mongodb server"


## To start the database server

1. Install and configure monogodb on the system / a cloud database can also be used.

2. Create a database with the name `RegistrationData` and create a collection inside it as `users`

3. Copy the connection string for the database instance


## To start the backend server

1. Navigate to the backend folder inside reactform folder in a terminal and run the following command

### `node index.js`

Runs the node server on port 5000


### Finally we can run the frontend server


## To start the frontend server / ReactJS part 

1. Navigate to the reactform folder in a terminal and run the following command

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


