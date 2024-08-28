const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new MongoClient(process.env.MONGODB_URI);

(async () => {
    const conn = await client.connect();
    const db = conn.db("express-react");
    let collection = await db.collection("products");

    app.get('/', async (req, res) => {
        const message = await collection.find({}).toArray();
        res.json({ message: message })
    });

    app.post('/submit', async (req, res) => {
        const { name, price } = req.body;
        const message = await collection.insertOne({name: name, age: price});
        res.send(`Received data - Name: ${name}, Age: ${price}`);
    });

    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
    });
})();
