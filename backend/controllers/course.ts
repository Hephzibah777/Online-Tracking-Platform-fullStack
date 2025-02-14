import { QueryTypes } from "sequelize";
import db from "../config/db";
import {Request, Response} from "express";

async function addCourse(req:Request, res:Response){
    try{
        const name=req.body.name;
        const createdAt=new Date();
        const updatedAt=new Date();
        const course=db.sequelize.query(`INSERT INTO Courses(name, createdAt, updatedAt) VALUES(:name, :createdAt, :updatedAt)`,{
            replacements:{name:name, createdAt:createdAt, updatedAt:updatedAt},
            type:QueryTypes.INSERT
        })
        res.status(200).json({message:"Course Details Successfully Added"});
    }
    catch(error){
        res.status(500).json({message:"Error adding Course Details"});
    }
}

async function allCourse(req:Request, res:Response){
    try{
        
        const course=await db.sequelize.query(`SELECT * FROM Courses`,{
            type:QueryTypes.SELECT
        })
        res.json(course);
    }
    catch(error){
        res.status(500).json({message:"Error fetching courses"});
    }
}
async function selectedCourse(req:Request, res:Response){
    try{
        const id=req.params.courseId;
        const course=db.sequelize.query(`SELECT * FROM Courses where id=:courseId`,{
            replacements:{courseId:id},
            type:QueryTypes.SELECT
        })
        res.json(course);
    }
    catch(error){
        res.status(500).json({message:"Error fetching courses"});
    }
}
async function deleteCourse(req:Request, res:Response){
    try{
        const id=req.params.courseId;
        const course=db.sequelize.query(`DELETE FROM Courses where id=:courseId`,{
            replacements:{courseId:id},
            type:QueryTypes.DELETE
        })
        res.json(course);
    }
    catch(error){
        res.status(500).json({message:"Error deleting course"});
    }
}


const courseController={
    addCourse:addCourse,
    allCourse:allCourse,
    selectedCourse:selectedCourse,
    deleteCourse:deleteCourse
}

export default courseController;