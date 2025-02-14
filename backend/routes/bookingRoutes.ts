import express from "express"
import bookingController from "../controllers/booking";
const router = express.Router();

router.post("/bookings",bookingController.addBooking);
router.get("/bookings", bookingController.allBooking);
router.get("/bookings/:bookingId", bookingController.selectedBooking);
router.delete("/bookings/:bookingId", bookingController.deleteselectedBooking);

export default router;