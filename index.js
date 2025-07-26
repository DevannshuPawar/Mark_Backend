const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const MONGO_URI = 'mongodb+srv://Go_Mark_Digital:sudarshan_mark@mark.3eanwq5.mongodb.net/mark_database?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const userRoute = require('./Routes/Register');
app.use('/users', userRoute);

app.get('/', (req, res) => {
  res.send('🚀 API is working and connected to MongoDB!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
