const express = require('express');  //Express to set up our server
const fs = require('fs');  //fs to work with json file
const app = express();
const PORT = 5000;   //Port number for server

// Endpoint to get all users
app.get('/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {     //Reading users.json file
    if (err) {
      res.status(500).send('Failed to read data from file');   //What to tell user when error occurs
    } else {
      res.send(JSON.parse(data));   //Else we send json data to client
    }
  });
});

// Endpoint to get user by user's ID
app.get('/users/:id', (req, res) =>{
  fs.readFile('users.json', 'utf8', (err, data) =>{
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.id === parseInt(req.params.id));
      if (user){
        res.send(user);  //Send user data if we find user
      } else {
        res.status(404).send('User does not exist with provided ID');   //Else what we tell user if we can't find them
      }
    }
  });
});

// Endpoint to get user byuser profession
app.get('/users/profession/:profession', (req, res) =>{
  fs.readFile('users.json', 'utf8', (err, data) =>{
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);   //Load all user data and filter based on profession
      const filteredUsers = Object.values(users).filter(user => user.profession.toLowerCase() === req.params.profession.toLowerCase());
      if (filteredUsers.length > 0) {
        res.send(filteredUsers);
      } else {
        res.status(404).send('No user exists with such profession');
      }
    }
  });
});

// Endpoint to get a user by user's name
app.get('/users/name/:name', (req, res) =>{
  fs.readFile('users.json', 'utf8', (err, data) =>{
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.name.toLowerCase() === req.params.name.toLowerCase());
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('User does not exist');
      }
    }
  });
});

// To start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});