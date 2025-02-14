import express from "express"
import courseController from "../controllers/course"

const router = express.Router();

router.post("/courses",courseController.addCourse);
router.get("/courses", courseController.allCourse);
router.get("/course/:courseId", courseController.selectedCourse);
router.delete("/courses/:courseId", courseController.deleteCourse);

export default router;