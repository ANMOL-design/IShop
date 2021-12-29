const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./../Model/userschema");
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
const Authentication = require('./Middleware/Authentication');
const url = "mongodb://127.0.0.1:27017/Ecommerce";

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connection for Login/Register established Successfully.");
    }
)

// Creating The Register Format to store it in database
router.post("/register", async(req, res) => {
    const { name, email, number, password, cpassword, time } = req.body;
    console.log(name);

    if (!name || !email || !number || !password || !cpassword) {
        return res.sendStatus(201);
    } else if (password !== cpassword) {
        return res.sendStatus(202);
    }


    // Find that user number is not available already in DB
    User.findOne({ number: number }).then((numberexist) => {
        if (numberexist) {
            return res.json({ msg: "Number is Already Exist" });
        }
    })

    // Finally find that email is not alredy exist and save data to DB
    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }

            const user = new User({ name, email, number, password, cpassword, time });


            // Save the user to DB and send Successful message
            user.save().then(() => {
                    res.status(200).json({ msg: "Registration Successful" });
                })
                .catch(() => {
                    res.status(501).json({ msg: "Failed to Register" })
                })
        })
        .catch((err) => {
            console.log("Mera Dimag Kaharab hai mai error bej ra" + err);
        })
})

// API for the uer Login
router.post("/login", async(req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(Email, Password);

        if (!Email || !Password) {
            console.log("Email or Password Not Filled.")
            return res.sendStatus(400);
        }

        const userLogin = await User.findOne({ email: Email });
        console.log(userLogin);

        // Match the user password and create a jwd token for him
        if (userLogin) {
            const isMatch = await bcrypt.compare(Password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            // console.log("The Token is Provided By Login: " + token);

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now + 25892000000),
                httpOnly: true
            })

            // console.log("Added to Cookies");

            // console.log("Status return");
            if (!isMatch) {
                console.log("Password Not correct.")
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                return res.status(200).json({ msg: "Login Succesfully" })
            }

            // console.log("Status return Again");

        } else {
            console.log("User Not Exist, Register First.")
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        console.log("Mai Pagal Ho gya hoo " + err);
        res.json({ msg: "Error Occur" })
    }
})

// Sent Back the User Profile after Verifying him
router.get('/aboutuser', Authentication, (req, res) => {
    res.send(req.rootUser);
});

// Code For User Logout 
router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken')
    res.status(200).send('user logout');
    console.log("logout")
});

module.exports = router;