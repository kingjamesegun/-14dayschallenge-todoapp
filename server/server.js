// libraries installed
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const methodOverride = require("method-override");

// imported modules
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./model/todo");

// https://github.com/kingjamesegun/-14dayschallenge-todoapp

var app = express();


// embedding javascript to the app
app.set("view engine", "ejs"); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

const PORT = process.env.PORT || 3000;


// RESTFUL ROUTES
app.get("/",(req,res)=>{
    res.redirect("/todos")
})

// fetching all todo list || GET ALL ROUTE
app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.render("index.ejs",{todos: todos});
    },(err)=>{
        res.status(400).send(err)
    })
});



// endpoint to create new todo || CREATE ROUTE
app.post("/todos",(req,res)=>{
    // creating new instance
    var todo = new Todo({
        text: req.body.text
        
    });

    // saving the todo
    todo.save().then((doc)=>{
        console.log(doc)
        res.redirect("/todos")
    }, (err)=>{
        console.log(err)
        res.status(400).send()
    })
});


// endpoint to find a single todo by id
app.get("/todos/:id", (req,res)=>{
    var id = req.params.id;
    if(!id){
        return res.status(400).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(400).send()
        }
        res.render("show",{todo: todo})
    }).catch((err)=>{
        res.status(400).send()
    })
    
});

// EDIT ROUTE
app.get("/todos/:id/edit",(req,res)=>{
    var id= req.params.id
    Todo.findById(id,(err,todo)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.render("edit.ejs",{newtodo:todo})
        }
    })
   
})

// UPDATE ROUTE
app.put("/todos/:id",  (req,res)=>{
    var id = req.params.id;

    // subset of things the user pass, chosing the text and the completed
    var body = _.pick(req.body, ['text', 'completed']);
    if(!id){
        return res.status(400).send();
    }
    // finding by id and updating
    Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(400).send()
        }
        res.redirect("/todos/" + req.params.id);
    }).catch((err)=>{
        res.status(400).send(err);
    }
);
})
// endpoint in deleting todos

app.delete("/todos/:id",(req,res)=>{
    var id = req.params.id;
    if(!id){
        return res.status(400).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo){
           return res.status(400).send();
       }
       res.redirect("/todos");
    }).catch((err)=>{
        res.status(400).send();
    })
});








// taking a random port and for deployment
app.listen(PORT, ()=>{
    console.log("Starting on port ", PORT)
})


