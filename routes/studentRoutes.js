const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.js');


//home route
router.get('/home', studentController.getHome);
router.post('/addstudent', studentController.addStudent);
router.post('/deletestudent', studentController.deleteStudent);
router.post('/updatestudent', studentController.updateStudent);
router.get('/api/v1/records', studentController.getAllRecords);
router.post('/delete', studentController.deleteAllRecords);


module.exports = router;