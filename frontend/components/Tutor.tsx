


import { useEffect, useState,React } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import tutorType from "../interfaces/tutorType";
import courseType from "../interfaces/courseType";
const Tutor = () => {
  const [tutors, setTutors] = useState<tutorType[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<tutorType[]>([]);
  const [courses, setCourses] = useState<Record<number, string>>({});
  const [selectedTutor, setSelectedTutor] = useState<tutorType | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "">("");
  const [studentId, setStudentId] = useState<number | "">("");

  useEffect(() => {
    fetchTutors();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (Object.keys(courses).length!=0) {
      setTutors((prevTutors) =>
        prevTutors.map((tutor) => ({
          ...tutor,
          courseName: courses[tutor.courseId],
        }))
      );
    }
  }, [courses]);

  useEffect(() => {
    let filtered = tutors;
    if (subjectFilter) {
      filtered = filtered.filter(tutor => tutor.courseName?.toLowerCase().includes(subjectFilter.toLowerCase()));
    }
    if (ratingFilter) {
      filtered = filtered.filter(tutor => tutor.rating >= Number(ratingFilter));
    }
    setFilteredTutors(filtered);
  }, [subjectFilter, ratingFilter, tutors]);

  const fetchTutors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tutors");
      setTutors(res.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");
      const courseMap: Record<number, string> = {};
      res.data.forEach((course: courseType) => (courseMap[course.id] = course.name));
      setCourses(courseMap);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const bookLesson = async () => {
    if (!selectedTutor || !date || !studentId) return;

    try {
      await axios.post("http://localhost:5000/bookings", {
        courseId: selectedTutor.courseId,
        studentId,
        date
      });
      alert("Lesson booked successfully!");
    } catch (error) {
      console.error("Error booking lesson:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Browse Tutors</h1>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Filter by subject" 
          value={subjectFilter} 
          onChange={(e) => setSubjectFilter(e.target.value)} 
          className="p-2 border rounded mr-2"
        />
        <input 
          type="number" 
          placeholder="Min rating" 
          value={ratingFilter} 
          onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : "")} 
          className="p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredTutors.map((tutor) => (
          <div key={tutor.id} onClick={() => setSelectedTutor(tutor)} className="cursor-pointer p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold">{tutor.name}</h2>
            <p>Course: {tutor.courseName || "Loading..."}</p>
            <p>Experience: {tutor.experience} years</p>
            <p>Rating: {tutor.rating} star</p>
          </div>
        ))}
      </div>

      {selectedTutor && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Book a lesson with {selectedTutor.name}</h2>
          <Calendar onChange={(value) => setDate(value as Date)} value={date} className="mt-4" />
          <input 
            type="number" 
            placeholder="Enter Student ID" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value ? Number(e.target.value) : "")} 
            className="p-2 border rounded mt-4"
          />
          <button onClick={bookLesson} className="mt-4 p-2 bg-blue-500 text-white rounded">Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default Tutor;