require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
  const User = require('./models/User');

  // GET all users
  app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
  });
  
  // POST a new user
  app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  });
  
  // PUT update a user by ID
  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.send(user);
  });
  
  // DELETE a user by ID
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  });
  

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}...`));
