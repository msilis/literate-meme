const express = require("express");
const router = express.Router();
const ToDo = require("../models/toDo");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  checkToDoLength,
  checkUserName,
  checkImage,
  checkToken,
} = require("../middleware/middleware");

router.get("/", (req, res) => {
  res.send("You have gotten to the right place.");
});

//Register new user
router.post("/register", checkUserName, async (req, res) => {
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
router.post("/login", checkUserName, async (req, res) => {
  console.log("logging in");
  const usr = req.body.username;
  const pwd = req.body.password;
  try {
    console.log("doing username check");
    const userLogin = await User.findOne({ username: usr, password: pwd });
    console.log(userLogin)
    if (!userLogin) {
      console.log("Login not sucessful");
      res.status(401).send("Username or password incorrect");
    } else if(userLogin != null){
      console.log("it got to here");
      let token = jwt.sign(
        {
          username: usr,
          password: pwd,
        },
        "jwt-secret",
        {
          algorithm: "HS256",
        }
      );
      res.status(200).json({
        userLogin: userLogin["id"],
        token: token,
      });
    } else (res.status(401).json({message: "login failed"}))
  } catch (err) {
    console.log(err);
  }
});

//Add ToDo
router.post(
  "/add",
  checkToken,
  checkToDoLength,
  checkImage,
  async (req, res) => {
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
      console.log("Error got triggered");
      console.log(err);
      res.status(400).send({ msg: "There was an error" });
    }
  }
);

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
router.delete("/:id", checkToken, findToDoById, async (req, res) => {
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

module.exports = router;
