import app from "./app.js";
// import './db/conn.js';
import "./utils/mongoose.js";

app.listen(app.get("port"));
console.log(`server on port ${app.get("port")}`);