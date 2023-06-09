import { mongoose } from "mongoose";
// const {connect} = require("mongoose");
// const dotenv = require('dotenv');
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', false);

const connectionString = `${process.env.MONGO_URL}`;

(async () => {
    try {
        const db = await mongoose.connect(connectionString);
        console.log("DB connected to", "Drillshare");
    } catch (error) {
        console.log('here: ', process.env.DB_USERNAME)
        console.error(error);
    }
})();