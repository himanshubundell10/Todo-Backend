import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const app = express.Router();

//new user create
app.post("/new", register)

//for lgin
app.post("/login", login)
//for logout
app.get("/logout", logout)

// user find by id
app.get("/me",isAuthenticated,getMyProfile)


export default app