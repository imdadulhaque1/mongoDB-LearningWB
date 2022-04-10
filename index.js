const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/my-students")
  .then(() => {
    console.log("Connected to MongoDB Successfully!");
  })
  .catch((err) => {
    console.error("Connection Failed!");
  });

//!========> Schema -> defines the shape documents
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  entryDate: { type: Date, default: Date.now },
  passStatus: Boolean,
  hobbies: [],
  parents: {
    fatherName: String,
    motherName: String,
  },
  subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});

//TODO========> Model Create
const Student = mongoose.model("Student", studentSchema);

//TODO=====> C = Create
async function createStudent() {
  const student = new Student({
    firstName: "Israt Jahan",
    lastName: "Maisha",
    dob: new Date("10 December 2019"),
    passStatus: true,
    hobbies: ["Swimming", "Reading Book", "Travelling"],
    parents: {
      fatherName: "Enamul Haque",
      motherName: "Unknown",
    },
    subjects: [
      { name: "Computer Fundamental", marks: 75 },
      { name: "Data Science", marks: 77 },
      { name: "Engineering Mathematics" },
    ],
  });
  try {
    const studentData = await student.save();
    console.log(studentData);
  } catch (err) {
    console.log(err._message);
  }
}
// createStudent();

//TODO=====> R = Read the created collections
async function readAllStudentsInfo() {
  const studentsData = await Student.find();
  console.log(studentsData);
}
// readAllStudentsInfo();

// async function readSingleStudentsInfo() {
//   const studentsData = await Student.find({ firstName: "Imdadul" });
//   console.log(studentsData);
// }
// readSingleStudentsInfo();

async function readStudentsInfo() {
  const studentsData = await Student.find()
    .limit(4)
    .sort({ firstName: -1 })
    .select({ firstName: 1, lastName: 1, hobbies: 1, passStatus: 1 });
  // .countDocuments();
  console.log(studentsData);
}
// readStudentsInfo();

//TODO======> U = Update the students information
async function updateStudentsInfo(id) {
  const student = await Student.updateOne(
    { _id: id },
    {
      $set: { passStatus: false },
    }
  );
  console.log(student);
}
updateStudentsInfo("62514fffc701c15cf3ee0ce9");

//TODO=====> D = Delete the student information
async function deleteStudentInfo(id) {
  const student = await Student.deleteOne({ _id: id });
  console.log(student);
}
// deleteStudentInfo("624e7bb45d8f606a603e10c2");
