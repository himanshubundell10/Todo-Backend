import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

//created new task
export const newTask = async (req, res,next) => {

try {
    const { title, description } = req.body

    await Task.create({ title, description, user: req.user })

    res.status(201).json({
        success: true,
        message: "Task Created Successfully",
    })
    
} catch (error) {
    next(error)
}

}

// get my task
export const getMyTask = async (req, res) => {

  try {
    const {_id}  = req.user

  const task = await Task.find({user:_id})

  res.status(200).json({
    success:true,
    task
  })
    
  } catch (error) {
    next(error)
    
  }

}
// update task
export const updateTask = async (req, res,next) => {
  try{
    const {id} = req.params

    const task = await Task.findById(id);

     if(!task) return next(new ErrorHandler("Task Not Found",404));

    task.isCompleted = !task.isCompleted;

    await task.save();

  res.status(200).json({
    success:true,
    message:"Task Updated"
    
  })

  }catch(error){
    next(error)

  }

}
// delete task
export const deleteTask = async (req, res,next) => {
   try {
    const {id} = req.params;
    const task = await Task.findById(id);

    if(!task)  return next(new ErrorHandler("Task Not Found",404));

    await task.deleteOne();

  res.status(200).json({
    success:true,
    message:"Task Deleted"
   
  })
    
   } catch (error) {
    next(error)
    
   }

}