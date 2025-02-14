import express from "express"
import tutorController from "../controllers/tutor";


const router = express.Router();

router.post("/tutors",tutorController.addTutor);
router.get("/tutors", tutorController.allTutor);
router.get("/tutors/:tutorId", tutorController.selectedTutor);
router.delete("/tutors/:tutorId", tutorController.deleteselectedTutor);

export default router;