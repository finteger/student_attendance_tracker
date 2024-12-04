const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');


exports.register = async (req, res) =>{

   const {email, password, confirmPassword} = req.body;
 
    try {

        const existingUser = await mongoose.findOne({email});

        if(existingUser){
            return res.status(400).send('User already exists.  Please try again.');
        }

        if(password !== confirmPassword){
            return res.status(400).send('Passwords do not match.  Please try again.');
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new AttendanceManager({
            email,
            password: hashPassword
        });

        await newUser.save();

        res.redirect('/login');

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }

}