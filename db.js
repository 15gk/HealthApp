const User = require('./models/user');

const mongoose = require('mongoose');//mongoose package

// mongoose.connect('mongodb://localhost/doctors'); // mongoose package has connect function

const db = mongoose.connection;
db.on('error', (err) => console.log('MongoDB error occured:', err))
 db.once('open', () => {
   console.log('Connected to MongoDB')
})




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://User:5URlLye5ztvX25VM@health.3svixrs.mongodb.net/test";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
 // Import the schema



mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new user and save it to the database
const newUser = new User({
    username: 'user11',
    password: 'password11',
    role: 'patient',
    doctorId: null,
    patientId: 'pat-006'
});
newUser.save()
    .then(() => {
        console.log('Model saved successfully');
    })
    .catch(error => {
        console.error('Error saving model:', error);
    });


