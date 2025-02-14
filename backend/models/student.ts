import db from "../config/db"
import { DataTypes } from "sequelize";
const Student=db.sequelize.define(
    'Student',
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

export default Student;