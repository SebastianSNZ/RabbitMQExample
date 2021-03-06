const express = require('express');
const app = new express();

const MongoClient = require("mongodb").MongoClient;
const DB_URI = 'mongodb+srv://root:1234@cluster0.a9nae.mongodb.net/labso1?retryWrites=true&w=majority';

var db;
MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db("labso1");
});
  

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/', async (req, res) => {
    const data = req.body;
    try {
        let collection = db.collection("personita2");
        let result = await collection.insertOne(data);
        res.json(result.ops[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

app.get('/', (req, res) => {
    res.json({message: 'OK'})
});

app.listen(5000);