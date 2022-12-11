import { DB_URL, PORT } from './config/index';
import express, { ErrorRequestHandler } from "express";
import createHttpError, { CreateHttpError } from "http-errors";
import exampleRoute from "./routes/exampleRoutes";
import mongoose, { connect } from "mongoose";
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';

const app = express();
app.use(express.json());

app.use("/", exampleRoute);
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use(() => {
  throw createHttpError(404, "Route Not Found");
});

mongoose.set('strictQuery', true);
mongoose
  
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server Started on Port ${PORT}`);
    });
  
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  })



app.use(errorHandler);