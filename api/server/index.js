import express from "express";
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import RawMessageArray from './models/RawMessageArray';

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const staticPath = path.join(__dirname, '../public');
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.post('/message/new', async (req, res) => {
  try {
    const newRawMessageArray = new RawMessageArray({
      messages: req.body
    });
    
    const savedMessageArray = await newRawMessageArray.save();
    console.log(savedMessageArray);
    
    res.status(201).json({
      message: `Successfully saved message array`,
      savedMessageArray
    });
  } catch (error) {
    console.error('Error in /message/new route:', error);
    res.status(500).json({ error: 'An error occurred while saving the message array' });
  }
});

// This should be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start the server
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});