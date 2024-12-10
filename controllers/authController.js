const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');


exports.register = async (req, res) =>{

   const {email, password, confirmPassword} = req.body;
 
    try {

        const existingUser = await AttendanceManager.findOne({email});

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

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
      const user = await AttendanceManager.find({email});

      if(!user){
        return res.status(404).send('User not found');
      }

      //Verify the password using bcrypt
      const result = await bcrypt.verify(password, user.password);

      if(!result){
        return res.status(401).send('Password does not match or is invalid.');
      }

    } catch (error) {
        
    }

}