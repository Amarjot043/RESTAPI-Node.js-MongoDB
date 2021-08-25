const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');

const route = express.Router();





//get all users
route.get('/', async(req, res) =>{
  try{
    const users = await User.find();
    res.json(users);
  } catch(err){
    res.json({message: err});
  }
})

//get a specific user
route.get('/:id', async(req, res) =>{
  try{
  const userFind = await User.findById(req.params.id);
  res.json(userFind);
  } catch(err){
    res.json({message: err});
  }
})

//delete a specified user
route.delete('/:id', async( req, res) =>{
  try{
   const removeUser = await User.remove({_id: req.params.id})
   res.json(removeUser);
  } catch(err){
    res.json({message:err});
  }
})

//update a user inf
route.patch('/:id', async(req, res) =>{
  try{
    const updateUser = await User.updateOne({_id: req.params.id},{ $set:{firstName: req.body.firstName}});
    res.json(updatePost);
  } catch(err){
    res.json({message: err});
  }
})




module.exports = route;
