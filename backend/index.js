const express = require('express');
const connectToDatabase = require('./db'); // Import the db.js\
const cors=require('cors')
require('dotenv').config(); 
const Task = require('./models/infoModel'); // Import the Task model


const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// Example Route

app.get('/tasks', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const {pass}=req.body;
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
});
// GET Request: Retrieve all tasks
app.post('/tasks/find', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const {pass}=req.body;
        const tasks = await Task.find({pass});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
});
app.post('/tasks/find/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        // Fetch all tasks from the database
        const task = await Task.findById(taskId);
        // Fetch all tasks from the database
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
});
app.get('/tasks/find/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
        // Fetch all tasks from the database
        const task = await Task.findById(taskId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
});
app.post('/tasks', async (req, res) => {
    try {
        const { header, subText, date, tag ,pass} = req.body;

        // Validate required fields
        if (!header || !subText ||!date ||!tag||!pass) {
            return res.status(400).send("Missing required fields");
        }

        // Create and save the task
        const newTask = new Task({ header, subText, date, tag ,pass});
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
});


app.put('/tasks/:id', async (req, res) => {
    try {
        const { header, subText,date, tag } = req.body; // Destructure updated fields from the request body
        const taskId = req.params.id;

        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Task not found
        }

        // Update task fields
        task.header = header || task.header;
        task.subText = subText || task.subText;
        task.date = date || task.date;
        task.tag = tag || task.tag;

        // Save the updated task
        const updatedTask = await task.save();
        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating task',
            error: error.message,
        });
    }
});

// DELETE Request: Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Task not found
        }

        // Remove the task from the database
        await task.deleteOne();
        res.status(200).json({
            message: 'Task deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting task',
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
