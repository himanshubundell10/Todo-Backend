import  express  from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const app = express.Router();


//new task 
app.post("/new",isAuthenticated,newTask)
//getmy task
app.get("/my",isAuthenticated,getMyTask)


//update and delete task
app.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)



export default app