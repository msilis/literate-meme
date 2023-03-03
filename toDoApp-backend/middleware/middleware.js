//Middleware
const jwt = require("jsonwebtoken");

//Check length of ToDo

function checkToDoLength(req, res, next) {
  if (req.body.toDoText.length <= 140) {
    console.log("ToDo passed length check");
    req.toDoText = req.body.toDoText;
    next();
  } else if (req.body.toDoText.length > 140) {
    console.log("ToDo did NOT pass length check");
    res.status(400).send({ messgae: "ToDo is too long!" });
  }
}

//Check if username contains @gmail.com

function checkUserName(req, res, next) {
  const stringToCheck = "@gmail.com";
  if (req.body.username.includes(stringToCheck)) {
    console.log("Username check passed");
    req.username = req.body.username;
    next();
  } else {
    console.log("Username check NOT passed");
    res.status(401).send({ message: "Invalid username, needs to end with '@gmail.com'" });
  }
}


//Check input for image file

function checkImage(req, res, next) {
  const checkArray = [".png", ".gif", ".jpg", ".bmp"];
  if (checkArray.some((element) => req.body.toDoText.includes(element))) {
    res.status(400).send({ message: "Invalid input" });
  } else {
    req.toDoText = req.body.toDoText;
    next();
  }
}

//Check user token

function checkToken(req, res, next) {
  let token = req.headers["authorization"].split(" ")[1];
  console.log("token: ", token);
  try {
    console.log("checking token");
    if (jwt.verify(token, "jwt-secret")) {
      console.log("Token verified")
      req.userId = req.body.userId
      req.toDoText = req.body.toDoText
      
    } else {
      return res.status(403).send({ msg: "Your token was not verified" });
    }
  } catch (err) {
    res.send({ message: "There was an error in the token check" });
  }
  next();
}



module.exports = { checkToDoLength, checkUserName, checkImage, checkToken };
