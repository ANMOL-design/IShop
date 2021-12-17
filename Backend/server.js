const data = require("./JSON/ProductData.json");
const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


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
    console.log("Server is Running Successfully.")
})