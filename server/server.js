const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGODB_URI);

(async () => {
    const conn = await client.connect();
    const db = conn.db(process.env.MONGODB_NAME || "express-react");
    let collection = await db.collection("products");

    app.get('/products', async (req, res) => {
        const products = await collection.find({}).toArray();
        res.json({ products: products })
    });

    app.post('/products', async (req, res) => {
        const { name, price } = req.body;
        const message = await collection.insertOne({name: name, price: price});
        res.send(`Received product data and created with - Name: ${name}, Age: ${price}`);
    });

    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
    });
})();
