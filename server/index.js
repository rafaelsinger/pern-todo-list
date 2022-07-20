const express = require('express');
const app = express();
const cors = require("cors");
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo

//delete a todo

app.listen(5000, () => {
    console.log('server running on port 5000')
})