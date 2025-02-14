import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import tutorRoutes from "./routes/tutorRoutes"
import studentRoutes from "./routes/studentRoutes"
import courseRoutes from "./routes/courseRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import db from "./config/db"
import Tutor from "./models/tutor"
import Course from "./models/course"
import Student from "./models/student"
import Booking from "./models/bookings"
dotenv.config();


const app=express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

db.dbConnect();


app.use("/", tutorRoutes);
app.use("/", courseRoutes);
app.use("/", studentRoutes);
app.use("/", bookingRoutes);

db.tutors=Tutor;
db.courses=Course;
db.students=Student;
db.bookings=Booking;

// Sync Models with Database
db.sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});