import db from "../config/db"
import { DataType, DataTypes } from "sequelize";
const Course=db.sequelize.define(
    'Course',
    {
    
        id: {
          type:DataTypes.INTEGER,
          allowNull:false,
          primaryKey:true, 
          autoIncrement:true,
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false,
          }
    
});

export default Course;