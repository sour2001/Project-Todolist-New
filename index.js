//requiring express framework to be used in project 
const express=require('express');
//requiring path
const path=require('path');
//using port 8000
const port=8000;
//below to connect to database
const db=require('./config/mongoose');
const Todo=require('./models/todo');
const app=express();

// setting view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//setting body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//adding assests folder for using css,js
app.use(express.static("assets"));

var todolist=[{
    task:"Google Test",
    category:"School",
    date:"20/05/2001"
}];
app.get('/',function(req,res){
    //to using if do not want to coomect to database
   // return res.render('home',{
   //     contact_list:todolist
   // });
   //})

   //us this to connect to database
   Todo.find({},function(err,todoos){
    if(err){
        console.log('Error in fetching todo from db');
        return;
    } 
return res.render('home',{
   contact_list:todoos
});

});
});

//function to pushback the new data entered in form
app.post('/task',function(req,res){
   // use in case to use without database 
   //todolist.push(req.body);
   // return res.redirect('back');
   //})
   

   //use in case u want to connect to database
   

   Todo.create({
    task:req.body.task,
    category:req.body.category,
    date:req.body.date
   },function(err,newTodo){
    if(err){console.log('error');
return;}
console.log('*****',newTodo);
 return res.redirect('back');
   });

});


app.get('/delete-contact',function(req,res){
  /* to use without database 
   let tasks=req.query.task;
    let taskIndex=todolist.findIndex(contact=>contact.task==tasks);
if(taskIndex !=-1){
    todolist.splice(taskIndex,1);
}
    return res.redirect('back');
});*/

//making an id by acquiring value from database
let id=req.query.id;
   

//function to use the delete function 
Todo.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting an object from database');
        return;
    }
    return res.redirect('back');
})


 });




//adding function for cases like server fail or work fine.
app.listen(port,function(err){
    if(err){
        console.log('error in starting server');
        return ;
    }
    console.log('server working fine');
})