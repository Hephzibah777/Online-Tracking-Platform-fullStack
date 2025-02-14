import db from "../config/db"
import { DataTypes } from "sequelize";
import Course from "./course";

const Tutor=db.sequelize.define(
    'Tutor',
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
          },
        courseId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: Course,
                key:"id"
            }
        },
        experience: {
            type:DataTypes.STRING,
            allowNull:false,
          },
        rating: {
            type:DataTypes.INTEGER,
            allowNull:false,
          }
    
});

export default Tutor;