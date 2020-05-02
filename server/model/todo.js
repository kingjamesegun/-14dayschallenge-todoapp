// imported module
const mongoose = require("mongoose");


// creating the schema for the todo app
var Todo = mongoose.model("Todo",{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: false
    }
});

module.exports = {Todo};