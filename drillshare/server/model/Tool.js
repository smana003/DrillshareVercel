import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema({
    name: String,
    category: String,
    model_num: String
});

const Tool = mongoose.model('Tool', ToolSchema);


export default Tool