const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    authorId: {
        type: String,
        require: true
    },
    toDoBody: {
        type: String,
        require: true,
        //Check for string length and empty string
        maxLength: 140,
        validate: /\S+/

    },
    completed: {
        type: Boolean,
        require: true
    }
    
});

module.exports = mongoose.model('ToDo', toDoSchema)