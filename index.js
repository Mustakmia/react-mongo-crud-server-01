const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 4000;

// middleware
app.use(cors());
app.use(express.json());
// username: mydb-1
// password :YG1Jxvo9UIJqnAyn
// laptop ip:182.48.86.38


const uri = "mongodb+srv://mydb-1:YG1Jxvo9UIJqnAyn@cluster0.fuz1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifieldTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('foodMaster');
        const usersCollection = database.collection('users');

        // POST API

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('Hiting the post', req.body)
            console.log('added user', result);
            res.json(result);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    // ata server a dekhay
    res.send('Running my crud server geo pagla');
});

app.listen(port, () => {
    // ata cmd te show hoy
    console.log(' Running server on port ha ha ha', 5000);
})