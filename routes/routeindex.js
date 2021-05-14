const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Task = require('../model/task');

router.get('/', async function(req,res){
  var tasks = await Task.find();
  //console.log(tasks);
  res.render('index', {tasks})  
});

router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
  var task = new Task(req.body);
  // Obtener fecha de hoy
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  task.date = today

  await task.save();
  res.redirect('/');
});

// Ruta que nos permita eliminar tareas con el método "deleteOne"
router.get('/delete/:id', async (req,res) =>{
  var editing = false;
  var task = await Task.findById(req.params.id);
  res.render('edit', {task, editing});
})

router.post('/delete/:id', async(req,res) =>{
  var id = req.params.id;
  await Task.deleteOne({_id: id});
  res.redirect('/'); 
})

router.get('/edit/:id', async (req,res) =>{
  var editing = true;
  var task = await Task.findById(req.params.id);
  res.render('edit', {task, editing});
});

// Ruta para efectuar la actualizacion de los datos utilizando el metodo update()
router.post('/edit/:id', async(req,res) =>{
  var id = req.params.id;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
})

module.exports = router;