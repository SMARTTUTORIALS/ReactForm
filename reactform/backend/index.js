//import the dependencies
const express = require('express') //for building api endpoints
const cors = require('cors') // to accept request from same doamin
const mongoose = require('mongoose') // api for mongodb operations

require('dotenv').config({ path: '../.env'});  // use the environment variable

//initailize express app
const app = express();
app.use(cors());
app.use(express.json());

//count the number of requests received.
let reqID = 1;

const connectionString = `${process.env.DB_CONNECTION_STRING}/RegistrationData`;

//define the schema of what data will be stored.
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    age: String,
    gender: String,
    mobile: String,
    govtIdType: String,
    govtId: String,
    guardianSalutation: String,
    guardianName: String,
    email: String,
    emergencyPhone: String,
    address: String,
    state: String,
    city: String,
    country: String,
    pincode: String,
    occupation: String,
    religion: String,
    maritalStatus: String,
    bloodGroup: String,
    nationality: String,
});

// create the user model from schema this will help in creating documents in mongodb to store data
const userModel = mongoose.model('users', userSchema);

//function to initialize connection to database
async function main() {
    await mongoose.connect(connectionString);
}

//initialize database connection and show error if failed.
main().catch(err => console.log(err));


app.post('/register/user', (req, res) => {
    // only to indicate that a request has been received
    console.log("Request Received. ID: ",reqID++);

    //read data from request body and arrange it in the model to create new document for storage
    const data = new userModel({
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        mobile: (req.body.mobile.length > 0)?req.body.mobile : "NA",
        govtIdType: req.body.govtIdType,
        govtId: req.body.govtId,
        guardianSalutation: req.body.guardianSalutation,
        guardianName: (req.body.guardianName.length > 0 )? req.body.guardianName :"NA",
        email: req.body.email,
        emergencyPhone: req.body.emergencyPhone,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        pincode: req.body.pincode,
        occupation: req.body.occupation,
        religion: req.body.religion,
        maritalStatus: req.body.maritalStatus,
        bloodGroup: req.body.bloodGroup,
        nationality: req.body.nationality,
    });

    //attempt to save data to db
    data.save().then(savedData => {
        if (savedData === data) {
            res.send('User Registered Successfully');
        }
    }).catch((err) => {

        res.status(500).send('Unable to register user due to internal server error');
    });
});

app.get('/fetchall/users', (req, res) => {
    // only to indicate that a request has been received
    console.log("Request Received. ID: ",reqID++);

    userModel.find().exec()
        .then((data) => {

            res.send(data);

        }).catch((err) => {
            res.status(500).send('Error retrieving data');
        })
});


// start listening to port 5000 for requests
app.listen(5000, () => {
    console.log("server running at http://localhost:5000");
});
