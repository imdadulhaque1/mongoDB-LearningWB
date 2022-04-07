const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/my-students')
    .then(() =>{
        console.log("Connected to MongoDB Successfully!");
    })
    .catch(err =>{
        console.error("Connection Failed!")
    })


    //========> Schema -> defines the shape documents
    const studentSchema = new mongoose.Schema({
        firstName:String,
        lastName:String,
        dob:Date,
        entryDate: { type:Date, default: Date.now},
        passStatus: Boolean,
        hobbies: [],
        parents: {
            fatherName: String,
            motherName: String
        },
        subjects: [{name:String, marks:{type:Number, min:0, max:100}}]
    })

    //========> Model Create
    const Student = mongoose.model('Student', studentSchema); 
    const student = new Student({
        firstName: "Imdadul",
        lastName: "Haque",
        dob: new Date("07 April 2022"),
        passStatus: true,
        hobbies: ["Swimming", "Playing Football", "Travelling"],
        parents:{
            fatherName: "Ismail Hossain",
            motherName: "Marzia Khatun"
        },
        subjects:[{name: "Computer Fundamental", marks:75}, {name:"Data Science", marks: 77}, {name: "Engineering Mathematics"}]
    })
    student.save()
        .then(studentsData =>{
            console.log(studentsData);
        })