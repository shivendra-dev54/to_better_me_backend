import express from "express"
import cors from "cors"
import AuthRouter from "./Routes/AuthRouter";
import UserRouter from "./Routes/UserRouter";
import dbConnect from "./Config/dbConnect";

const app = express();

dbConnect();

app.use(cors());
app.use(express.json());
app.use(AuthRouter);
app.use(UserRouter);

export default app;