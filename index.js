import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRoutes from './routes/user.js';
import quesRoutes from './routes/ques.js';
const app = express();

config({
    path: "./.env",
})

connectDB();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors({
    credential: true,
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(cookieParser());
app.get('/', (req,res) => {
    res.json("ok");
})
app.use(userRoutes);
app.use(quesRoutes);
app.listen(4000);