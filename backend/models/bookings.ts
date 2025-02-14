import db from "../config/db"
import { DataTypes } from "sequelize";
import Course from "./course";
import Student from "./student";

const Booking=db.sequelize.define(
    'Booking',
    {
    
        id: {
          type:DataTypes.INTEGER,
          allowNull:false,
          primaryKey:true, 
          autoIncrement:true,
        },
        courseId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: Course,
                key:"id"
            }
        },
        studentId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: Student,
                key:"id"
            }
        }
     
     
    
});

export default Booking;