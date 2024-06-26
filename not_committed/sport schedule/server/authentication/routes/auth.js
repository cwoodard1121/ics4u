// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../modles/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const enviro = require('dotenv')
enviro.config()

// POST request to handle login form submission
router.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {    
    if (err) {
      console.log(err)
    }
    if (!user) {

      return res.redirect('/login'); // Redirect to login page
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      console.log(user)
      const jwt_USER = {
        _id : user._id,
        role: user.role
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
      // Handle error
      return res.status(500).send('Internal Server Error');
    }
  })
  res.redirect('/logoutConfirmed');
});

// router.post('/register'...)
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        role
      });
  
      // Save the new user to the database
      await newUser.save();
      console.log("we be getting new (users)" + `${email}, ${password}`)
      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

module.exports = router;