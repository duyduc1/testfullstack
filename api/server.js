const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require('path');

mongoose.connect("mongodb://localhost:27017/testfullstack")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('error');
    });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(cookieParser());

const userRegister = require('./routers/userregister.route')
const userLogin = require('./routers/userlogin.route')
const page = require('./routers/page.route')
const profileroute = require('./routers/profile.route')

app.use('/userregister' , userRegister)
app.use('/userlogin' , userLogin)
app.use('/page' , page)
app.use('/profile' , profileroute)

app.listen(3006)