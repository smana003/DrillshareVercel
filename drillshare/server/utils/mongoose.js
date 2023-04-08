// import { connect } from "mongoose";
const {connect} = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connectionString = `mongodb+srv://smanandhar96:9LlU9tE6JykX8qZ4@drillshare.pmlbx.mongodb.net/`;

(async () => {
    try {
        const db = await connect(connectionString);
        console.log("DB connected to", db.connection.name);
    } catch (error) {
        console.log(process.env.DB_USERNAME)
        console.error(error);
    }
})();