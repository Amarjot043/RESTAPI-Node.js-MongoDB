const express = require('express');
const mongoose = require('mongoose');
const User = require('./DB/User');
const bodyParser = require('body-parser')
const connectDB = require('./DB/Connection')

// const fs = require('fs');
const multer = require('multer');
// var csv = require("fast-csv");
const csvtojson = require('csvtojson');
// const csvFilePath = "./rnd2.csv"

const upload = multer({dest: 'upload/'})

const app = express();

//import routes
const apiRoute = require('./API/User')

connectDB();
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use('/api/userModel', apiRoute);

const Port = 3000;

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html');
})



//add file
app.post('/upload',upload.single('file-upload'), (req, res) => {

    let csv_file = req.file
    csvtojson().fromFile(`./upload/${req.file.filename}`).then(async(jsonObj)=>{

        console.log(jsonObj);

        
        

        const {firstName, lastName, statuses} = req.body;
        let user  = [];
        user.firstName = firstName;
        user.lastName = lastName;
        user.statuses = statuses;
        let userModel = new User(user);
        await userModel.save();
        res.json(userModel);
       
    
    }
    )


    
});



app.listen(Port, () => console.log('Server started'));



