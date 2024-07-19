// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const noteRoutes = require('./routes/notes');

const authRoutes = require('./routes/auth');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

mongoose.connect('mongodb+srv://luckyreddychintu:fogi9457@cluster0.jcdy6hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.get("/",(req,res)=>{
    res.send("success")
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


