const express = require('express');
const router = express.Router();
const Todo = require('../todo-app/Todo');
// const {connectDb, getDB} = require('../todo-app/db');

//create a new TODO


router.post('/', async (req, res) => {
    const todo = new Todo({
      id: req.body.id,
        title: req.body.title,
    });
  
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
//to find all todos
router.get('/',async (req,res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);      
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
// to get one todo
router.get('/:id', async (req,res) =>{
        try{
            const todo = await Todo.findById(req.params.id);
            if(todo == null)
                return res.status(404).json({message: 'cannot find Todo'});
            res.json(todo);
        }catch(err){
            res.status(500).json({message: err.message});
        }
});
// update a Todo
router.patch('/:id', async (req, res) => {
        try{
            const todo = await Todo.findById(req.params.id);
            if(todo == null)
                return res.status(404).json({message: 'cannot find Todo'});
            if(req.body.title != null)
                todo.title =req.body.title;
            const updateTodo = await todo.save();
            res.json(updateTodo);
        }catch(err){
            res.status(500).json({message: err.message});
        }

});
// Delete a Todo
router.delete('/:id', async (req,res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(todo == null)
                return res.status(404).json({message: 'cannot find Todo'});
        res.json({message: 'Todo Deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router ;


