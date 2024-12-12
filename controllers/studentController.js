const StudentRecord = require('../models/studentRecord.js');
const AttendanceManager = require('../models/attendanceManager.js');

exports.getHome = async (req, res) =>{
    try {
        const students = await StudentRecord.find({});

        const maxAttendanceCount = students ? students.length : 0;

        res.render('attendance.ejs', {students, maxAttendanceCount});

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }

}

exports.addStudent = async (req, res) =>{
   const {email , name} = req.body;
    try {
       const student = new StudentRecord({ name: name, email: email});
       await student.save();
       res.redirect('/home');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.getAllRecords = async (req, res) =>{
  try {
    const records = await StudentRecord.find().exec();
    res.json(records);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

exports.deleteAllRecords = async (req, res) =>{
    try {
        await StudentRecord.deleteMany();
        res.redirect('/home');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteStudent = async (req, res) =>{
   try {
     const studentName = req.body.name;
     const result = await StudentRecord.deleteOne({name : studentName});

    if(result.deleteCount === 0){
        res.status(404).send('Student not found');
    } else {
        res.redirect('/home');
    }

   } catch (error) {
      res.status(500).send('Internal Server Error');
   }
}

exports.updateStudent = async (req, res) =>{
    const {attendanceDate} = req.body;
    const length = req.body.attendance ? req.body.attendance.length : 0;

    try {
        //Update the attendance for students who are marked as present
        for(let i = 0; i < length; i++){
            const studentId = req.body.attendance[i];
            await StudentRecord.findByIdAndUpdate(
                studentId,
                {
                    $inc: { attendanceCount: 1},           
                    $push: {attendance: {date: new Date(attendanceDate), status: 'present'}},
                },
                {new: true},
            )
        }
       res.redirect('/home'); 
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`);
    }

}


