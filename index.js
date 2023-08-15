const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middlewares

app.use(cors())
app.use(express.json())

// ===========MongoDb============

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hla3ttg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const toyCollection = client.db('legoLand').collection('toys');
        const categoryCollection = client.db('legoLand').collection('category');

        // Api for getting Categories
        app.get('/categories', async (req, res) => {
            const categories = categoryCollection.find();
            const result = await categories.toArray();
            res.send(result);
        })

        // Api for getting All Toys
        app.get('/toys', async (req, res) => {

            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }

            const toys = toyCollection.find(query);
            const result = await toys.toArray();
            res.send(result);
        })

        // Car subcategory API
        app.get('/toys/categories/car', async (req, res) => {
            let subCategory = "car"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // Marvel subcategory API
        app.get('/toys/categories/marvel', async (req, res) => {
            let subCategory = "marvel"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // Marvel subcategory API
        app.get('/toys/categories/architecture', async (req, res) => {
            let subCategory = "architecture"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // Minecraft subcategory API
        app.get('/toys/categories/minecraft', async (req, res) => {
            let subCategory = "minecraft"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // Sports subcategory API
        app.get('/toys/categories/sports', async (req, res) => {
            let subCategory = "sports"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // City subcategory API
        app.get('/toys/categories/city', async (req, res) => {
            let subCategory = "city"
            const filter = { subCategory: subCategory };
            console.log(filter);
            const result = await toyCollection.find(filter).toArray();
            res.send(result);
        })

        // Signle Product API
        app.get('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await toyCollection.findOne(query);
            res.send(result)
        })




        // Update API
        app.patch('/toys/:id', async (req, res) => {
            const id = req.params.id;

            const updatedToy = {
                $set: req.body
            }
            // console.log(updatedToy);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };

            const result = await toyCollection.updateOne(filter, updatedToy, options)
            res.send(result);
        })

        // Api for adding single toy entry
        app.post('/toys', async (req, res) => {
            const toy = req.body;
            // console.log(toy);
            const result = await toyCollection.insertOne(toy);
            res.send(result);
        })

        // Delete API
        app.delete('/toys/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await toyCollection.deleteOne(query);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Lego Land Server running');
})

app.listen(port, () => {
    console.log("server running on port", port);
})