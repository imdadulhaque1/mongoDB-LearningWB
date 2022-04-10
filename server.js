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
  firstName: { type: String, required: [true, "Please insert your firstName"] },
  lastName: { type: String, required: [true, "Please insert your lastName"] },
  dob: Date,
  entryDate: { type: Date, default: Date.now },
  passStatus: {
    type: Boolean,
    required: [true, "Please, type your academic Passing status"],
  },
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
  try {
    const data = await Student.create({
      firstName: "Imdadul",
      lastName: "Haque",
      dob: new Date("10 December 1997"),
      passStatus: true,
      hobbies: ["Swimming", "Reading Book", "Travelling"],
      parents: {
        fatherName: "Ismail Hossin",
        motherName: "Marzia Khatun",
      },
      subjects: [
        { name: "Computer Fundamental", marks: 75 },
        { name: "Data Science", marks: 77 },
        { name: "Engineering Mathematics" },
      ],
    });
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
// createStudent();
