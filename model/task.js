const {Schema, model} = require("mongoose");

const TaskSchema = Schema ({

    title: String,
    author: String,
    date: String,
    post_data: String,
});


module.exports = model('tasks', TaskSchema);