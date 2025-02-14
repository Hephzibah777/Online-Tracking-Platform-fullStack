import mysql from "mysql2";
import { Sequelize } from "sequelize";
import Tutor from "../models/tutor"

const dbName='OTP';
const dbUser='root';
const dbPassword='root';

const sequelize=new Sequelize(dbName, dbUser, dbPassword,{
    host:'localhost',
    dialect:"mysql",
    logging:console.log
   
});

const dbConnect=()=>{
    sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))
}

const db={
    sequelize:sequelize,
    dbConnect:dbConnect,
    tutors:{},
    courses:{},
    students:{},
    bookings:{}

}

export default db; 