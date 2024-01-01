const express = require('express');
const { connectToDb, getDb } = require('./db');
const cors = require('cors'); // Import cors

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Enable CORS for all routes
app.use(cors());

let db;

connectToDb((err) => {
  if (err) {
    console.error('Error occurred while connecting to the database:', err);
    return;
  }
  console.log('Connected successfully to the database');

  app.listen(5000, () => {
    console.log('App listening on port 5000');
  });

  db = getDb();
});


app.get('/display', (req, res) => {
  if (!db) {
    return res.status(500).send('Database not connected');
  }

  db.collection('books')
    .find()
    .toArray()
    .then((books) => {
      res.json(books); // Sending the books as JSON to the frontend
      console.log(books);
    })
    .catch((err) => {
      console.error('Error fetching documents:', err);
      res.status(500).send('Could not fetch the documents');
    });
});

app.post('/addbook', (req, res) => {
  if (!db) {
    return res.status(500).send('Database not connected');
  }

  const newBook = req.body; // Assuming request body contains the new book data

  db.collection('books')
    .insertOne(newBook)
    .then((result) => {
      res.status(201).json({ message: 'Book added successfully' });
    })
    .catch((err) => {
      console.error('Error adding book:', err);
      res.status(500).send('Could not add the book');
    });
});



module.exports = app;
