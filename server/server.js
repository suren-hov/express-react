const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv')

app.use(cors())
dotenv.config()

const client = new MongoClient(process.env.MONGODB_URI)

const main = async () => {
    let conn, db, collection;
    try {
        conn = await client.connect();
        db = conn.db("express-react");
    } catch(e) {
        console.error(e);
    }

    try {
        collection = await db.collection("posts");
    } catch(e) {
        console.error(e);
    }

    app.get('/', async (req, res) => {
        const message = await collection.find({}).toArray()
        res.json({ message: message[0].a})
    });
    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
    });
}

main()
