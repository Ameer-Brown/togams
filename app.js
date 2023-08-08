const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// First middleware: logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// most important and true middleware: home route
app.get('/', (req, res) => {
  res.send('TOGAMS = The Ogunlesi Group Artist Mgmt System');
});

// tour-management-suite
app.use('/tours', require('./tour-management-suite/routes'));

// unified-comm-portal
app.use('/inbox', require('./unified-comm-portal/routes'));

// stakeholder-management-system
app.use('/user-management', require('./stakeholder-management-system/routes'));

// music-management-system
app.use('/music-admin', require('./music-management-system/routes'));

// artist-progress-dashboard
app.use('/calandar', require('./artist-progress-dashboard/routes'));

// artist-progress-dashboard
app.use('/custom-dash', require('./customizable-dashboard/routes'));
// 404 handler
app.use((req, res) => {
  res.status(404);
  res.send('404: File Not Found');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));


//Database Managment

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://togams:DxuO5iU922S7Z61j@cluster0.pi0qsca.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server (optional starting in v4.7)
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
