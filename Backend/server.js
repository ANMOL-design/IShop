const data = require("./JSON/ProductData.json");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const route = require("./Routes/Login");
dotenv.config();
app.use(express.json());
const razorpayRouter = require('./Routes/Razopay');

const url = "mongodb://127.0.0.1:27017/Ecommerce";
// app.use(require("./Routes/Login.js"));
app.use(route);

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);


const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// Razorpay Integration
app.use(`/razorpay`, razorpayRouter)

// API for the Products Page
app.get("/api/products", (req, res) => {
    res.send(data);
})

// API for the Products Page for specific id or product
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.find(x => x.id === productId);
    if (product)
        res.send(product);
    else
        res.status(404).send({ msg: "Product Not Found. " })
})

app.listen(PORT, () => {
    console.log("Server is Running Successfully at PORT", PORT);
})