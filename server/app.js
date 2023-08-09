const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
const uri = process.env.MONGO_URI || "mongodb+srv://togams:DxuO5iU922S7Z61j@cluster0.pi0qsca.mongodb.net/?retryWrites=true&w=majority"; // Remember to setup MONGO_URI in your environment variables

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });

// First middleware: logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Home route
app.get('/api/home', (req, res) => {
  res.send('💿💿💿 TOGAMS = The Ogunlesi Group Artist Mgmt System');
});

// Define your routes here
app.use('/api/tours', require('./tour-management-suite/routes'));
app.use('/api/inbox', require('./unified-comm-portal/routes'));
app.use('/api/user-management', require('./stakeholder-management-system/routes'));
app.use('/api/music-admin', require('./music-management-system/routes'));
app.use('/api/calendar', require('./artist-progress-dashboard/routes'));
app.use('/api/custom-dash', require('./customizable-dashboard/routes'));

// Serve React frontend in production or staging
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('404: File Not Found');
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

