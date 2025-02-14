import { QueryTypes } from "sequelize";
import db from "../config/db";
import {Request, Response} from "express";

async function addTutor(req:Request, res:Response){
    try{
        const {name, courseId, experience, rating}=req.body;
        const createdAt=new Date();
        const updatedAt=new Date();
        const tutor=await db.sequelize.query(`INSERT INTO Tutors(name, courseId, experience,rating, createdAt, updatedAt) VALUES(:name, :courseId, :experience, :rating, :createdAt, :updatedAt)`,{
            replacements:{name:name, courseId:courseId, experience:experience, rating:rating, createdAt:createdAt,updatedAt:updatedAt},
            type:QueryTypes.INSERT,
        })
        res.status(200).json({message:"Tutor Details Successfully Added"});

    }
    catch(error){
        res.status(500).json({message:"Error adding Tutor Details"});

    }
}

async function allTutor(req:Request, res:Response){
    try{
        
        const tutors=await db.sequelize.query(`SELECT * FROM Tutors`,{
            type:QueryTypes.SELECT
        })
        console.log(tutors);
        res.send(tutors);
    }
    catch(error){
        res.status(500).json({message:"Error fetching tutors"});
    }
}
async function selectedTutor(req:Request, res:Response){
    try{
        const courseId=req.params.courseId;
        const tutor=await db.sequelize.query(`SELECT * FROM Tutors where courseId=:courseId`,{
            replacements:{courseId:courseId},
            type:QueryTypes.SELECT
        })
        res.send(tutor);
    }
    catch(error){
        res.status(500).json({message:"Error fetching tutors"});
    }
}
async function deleteselectedTutor(req:Request, res:Response){
    try{
        const id=req.params.tutorId;
        const tutor=await db.sequelize.query(`SELECT * FROM Tutors where id=:tutorId`,{
            replacements:{tutorId:id},
            type:QueryTypes.DELETE
        })
        res.json(tutor);
    }
    catch(error){
        res.status(500).json({message:"Error fetching tutors"});
    }
}

const tutorController={
    addTutor:addTutor,
    allTutor:allTutor,
    selectedTutor:selectedTutor,
    deleteselectedTutor:deleteselectedTutor
}

export default tutorController;