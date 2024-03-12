import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

//import routes
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js"
import { errorMiddleware } from "./middlewares/error.js";


config({
    path: "./.env"
})



const app = express();
const port = process.env.PORT





mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "backendapi",
    }).then((c) => console.log(`db cnnected with ${c.connection.host}`))
    .catch((e) => console.log(console.log(e)))

    //using  middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))


app.get("/", (req, res) => {
    res.send("api is working")
})


//user routes 
app.use("/api/v1/user", userRoute)
app.use("/api/v1/task", taskRoute)

//using error middleware
app.use(errorMiddleware)





app.listen(port, () => {
    console.log(`server is working on port ${port} in ${process.env.NODE_ENV} mode`)
})