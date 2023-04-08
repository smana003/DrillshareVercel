// import indexRouter from "./routes/index.js";
import router from "./routes/index.js";
import morgan from "morgan";
import 'dotenv/config'
import express from "express";
import cors from 'cors';
const app = express()
// const cors = require('cors');

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.set("port", 3005);

app.use(router);
app.use(morgan("dev"));

/**
 * Import our user authentication routes
 */
require('./routes/auth')(app);
require('./routes/user')(app);

/**
 * Catch all route, if we get to here then the
 * resource requested could not be found.
 */
app.use((req, res, next) => {
  console.log(req.body);
  console.log(res.body);
  console.log("we hit a snag");
  res.send("Error 404");
})


/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

export default app;
