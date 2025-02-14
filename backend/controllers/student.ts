import { QueryTypes } from "sequelize";
import db from "../config/db";
import {Request, Response} from "express";

async function addStudent(req:Request, res:Response){
    try{
        const name=req.body.name;
        const createdAt=new Date();
        const updatedAt=new Date();
        const cou=db.sequelize.query(`INSERT INTO Students(name, createdAt, updatedAt) VALUES(:name, :createdAt, :updatedAt)`,{
            replacements:{name:name, createdAt:createdAt, updatedAt:updatedAt},
            type:QueryTypes.INSERT
        })
        res.status(200).json({message:"Student Details Successfully Added"});
    }
    catch(error){
        res.status(500).json({message:"Error adding Student Details"});
    }
}

async function allStudent(req:Request, res:Response){
    try{
        
        const students=db.sequelize.query(`SELECT * FROM Students`,{
            type:QueryTypes.SELECT
        })
        res.json(students);
    }
    catch(error){
        res.status(500).json({message:"Error fetching Students"});
    }
}
async function selectedStudent(req:Request, res:Response){
    try{
        const id=req.params.studentId;
        const student=db.sequelize.query(`SELECT * FROM Students where id=:studentId`,{
            replacements:{studentId:id},
            type:QueryTypes.SELECT
        })
        res.json(student);
    }
    catch(error){
        res.status(500).json({message:"Error fetching courses"});
    }
}
async function deleteselectedStudent(req:Request, res:Response){
    try{
        const id=req.params.studentId;
        const student=db.sequelize.query(`DELETE FROM Students where id=:studentId`,{
            replacements:{studentId:id},
            type:QueryTypes.DELETE
        })
        res.json(student);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}


const studentController={
    addStudent:addStudent,
    allStudent:allStudent,
    selectedStudent:selectedStudent,
    deleteselectedStudent:deleteselectedStudent
}

export default studentController;