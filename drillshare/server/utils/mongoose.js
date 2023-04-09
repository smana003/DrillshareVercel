import { connect } from "mongoose";
// const {connect} = require("mongoose");
// const dotenv = require('dotenv');
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = `mongodb+srv://smanandhar96:9LlU9tE6JykX8qZ4@drillshare.71qidhy.mongodb.net/?retryWrites=true&w=majority`;

(async () => {
    try {
        const db = await connect(connectionString);
        console.log("DB connected to", "Drillshare");
    } catch (error) {
        console.log('here: ', process.env.DB_USERNAME)
        console.error(error);
    }
})();