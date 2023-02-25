const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    toDoBody: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('ToDo', toDoSchema)