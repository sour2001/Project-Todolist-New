const mongoose=require('mongoose');
// defclaring the todolist schema
const todolistSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});
const todo=mongoose.model('todo',todolistSchema);
// exporting the todo
module.exports=todo;