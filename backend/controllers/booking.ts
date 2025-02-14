import { QueryTypes } from "sequelize";
import db from "../config/db";
import {Request, Response} from "express";

async function addBooking(req:Request, res:Response){
    try{
        const courseId=req.body.courseId;
        const studentId=req.body.studentId;
        const createdAt=new Date();
        const updatedAt=new Date();
        const course=db.sequelize.query(`INSERT INTO Bookings(courseId, studentId, createdAt, updatedAt) VALUES(:courseId, :studentId, :createdAt, :updatedAt)`,{
            replacements:{courseId:courseId,studentId:studentId, createdAt:createdAt, updatedAt:updatedAt},
            type:QueryTypes.INSERT
        })
        res.status(200).json({message:"Booking Details Successfully Added"});
    }
    catch(error){
        res.status(500).json({message:"Error adding Booking Details"});
    }
}

async function allBooking(req:Request, res:Response){
    try{
        
        const bookings=db.sequelize.query(`SELECT * FROM Bookings`,{
            type:QueryTypes.SELECT
        })
        res.json(bookings);
    }
    catch(error){
        res.status(500).json({message:"Error fetching bookings"});
    }
}
async function selectedBooking(req:Request, res:Response){
    try{
        const id=req.params.bookingId;
        const booking=db.sequelize.query(`SELECT * FROM Bookings where id=:bookingId`,{
            replacements:{bookingId:id},
            type:QueryTypes.SELECT
        })
        res.json(booking);
    }
    catch(error){
        res.status(500).json({message:"Error fetching courses"});
    }
}

async function deleteselectedBooking(req:Request, res:Response){
    try{
        const id=req.params.bookingId;
        const booking=db.sequelize.query(`DELETE FROM Bookings where id=:bookingId`,{
            replacements:{bookingId:id},
            type:QueryTypes.SELECT
        })
        res.json(booking);
    }
    catch(error){
        res.status(500).json({message:"Error fetching courses"});
    }
}


const bookingController={
   addBooking:addBooking,
   allBooking:allBooking,
   selectedBooking:selectedBooking,
   deleteselectedBooking:deleteselectedBooking
}

export default bookingController;