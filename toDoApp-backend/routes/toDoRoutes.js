const express = require("express");
const router = express.Router();
const ToDo = require("../models/toDo");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("You have gotten to the right place.");
});

//Register new user
router.post("/register", async (req, res) => {
  console.log(req.body);
  const usr = req.body.username;
  const pwd = req.body.password;
  const user = new User({
    username: usr,
    password: pwd,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log({ msg: "There was an error" });
  }
});

//Login existing user
router.post("/login", async (req, res) => {
  console.log("logging in");
  const usr = req.body.username;
  const pwd = req.body.password;
  try {
    const userLogin = await User.findOne({ username: usr, password: pwd });
    if (!userLogin) {
      console.log("Login not sucessful");
      res.status(401).send("Username or password incorrect");
    }
    res.status(200).json(userLogin["id"]);
  } catch (err) {
    console.log("Wrong username or password.");
  }
});

//Post ToDo
router.post("/add", toDoLength, async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const toDoText = req.body.toDoText;
  const newToDo = new ToDo({
    authorId: userId,
    toDoBody: toDoText,
    completed: false,
  });
  try {
    const addToDo = await newToDo.save();
    res.status(200).json(addToDo);
  } catch (err) {
    res.status(404).send({ msg: "There was an error" });
  }
});

//Get user's ToDo's
router.post("/getToDo", async (req, res) => {
  console.log(req.body.userId);
  try {
    const getToDo = await ToDo.find({ authorId: req.body.userId });
    res.status(200).json(getToDo);
  } catch (err) {
    res.status(400).send("There was an error");
  }
});

//Delete ToDo
router.delete("/:id", findToDoById, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: "Todo has been deleted from the database" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update completed status of todo
router.patch("/:id", findToDoById, async (req, res) => {
  console.log(req.body);
  console.log(res.todo);
  res.todo.completed = !res.todo.completed;
  try {
    const toggleComplete = await res.todo.save();
    res.status(201).json(toggleComplete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Edit Todo
router.patch("/edit/:id", findToDoById, async (req, res) => {
  res.todo.toDoBody = req.body.toDoBody;
  try {
    const editToDo = await res.todo.save();
    res.status(201).json(editToDo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Find todo by ID middleware
async function findToDoById(req, res, next) {
  let todo;
  try {
    todo = await ToDo.findById(req.params.id);
    if (todo === null) {
      return res.status(404).json({ message: "Todo not found in database" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //if todo is in database, assign its value to 'todo'
  res.todo = todo;
  //continue with operation
  next();
}

//Check ToDo length middleware
async function toDoLength(req, res, next){
  const checkToDo = req.body.toDoText;
  console.log(checkToDo.length,  "line 127")
  if(checkToDo.length > 140){
    return res.status(413).json({message: "Item is larger than 140 characters."})
  }
  next();
}

module.exports = router;
