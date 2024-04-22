const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const enviro = require('dotenv')
enviro.config()

router.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {    
    if (err) {
      console.log(err)
    }
    if (!user) {

      return res.redirect('/login');
      // puts back on login i think
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
        // DOESNT WORK FIX 
      }

      console.log(user)
      const jwt_USER = {
        _id : user._id,
        perms: user.perms
      }
      const token = jwt.sign(jwt_USER, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  })
  (req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Internal Server Error');
    }
  })
  res.redirect('/logoutConfirmed');
});


router.post('/register', async (req, res) => {
    const { email, password, perms } = req.body;
  
    try {
      
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // hash instead of salt 
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        perms
      });
  
      // Save the new user to the database
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

module.exports = router;