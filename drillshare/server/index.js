import app from "./app.js";
// import './db/conn.js';
import "./utils/mongoose.js";

app.listen(process.env.PORT, (err) => {
  if(err) {
    console.log("err: ", err);
  }
  console.log(`server on port ${app.get("port")}`);
});
console.log("HERE");