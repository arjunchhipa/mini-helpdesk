require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketsRouter = require('./routes/tickets');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server started on port', PORT));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
