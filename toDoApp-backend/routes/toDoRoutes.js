const express = require('express');
const router = express.Router();
const ToDo = require('../models/toDo');
const User = require('../models/user');

router.get('/', (req, res)=>{
    
    res.send('You have gotten to the right place.')
})


// TODO This isn't working for some reason. I can post data using route.rest but not postman or the browser


router.post('/register', async (req, res)=> {
    console.log(req.body)
    const usr = req.body.username;
    const pwd = req.body.password;
    const user = new User({
        username: usr,
        password: pwd
    });
    try{    
        const newUser = await user.save();
        res.status(201).json(newUser)
    }catch (err){
        console.log({'msg': 'There was an error'})
    }

})

module.exports = router;