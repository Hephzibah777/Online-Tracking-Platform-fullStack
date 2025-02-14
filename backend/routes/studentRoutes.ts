import express from "express"
import studentController from "../controllers/student";
const router = express.Router();

router.post("/students",studentController.addStudent);
router.get("/students", studentController.allStudent);
router.delete("/students/:studentId", studentController.deleteselectedStudent);

export default router;