const express = require('express');
const User = require('../models/User'); 

const router = express.Router();


//SignUp
router.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    if (!name || !email || !password || !confirm_password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully!' });
    
});

//LogIn
router.post('/login', async (req, res) => {

    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
    const user = await User.findByEmail(email);
    console.log("User from DB:", user);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ 
        message: 'Login successful!',
       user: {id: user.id, name: user.name, email: user.email } 
     });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: 'Server error during login' });
    }
   
});

//Forgot Password
router.post('/forgot', async (req, res) => {
    const { email, newPassword } = req.body;
    console.log("Received data:", req.body); // Debugging line

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required." });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await User.updatePassword(email, newPassword);
        res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;