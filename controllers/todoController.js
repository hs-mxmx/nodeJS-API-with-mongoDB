
var bodyParser = require('body-parser');
var dataBase = require('./dataBase')
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Connect to DB
var Todo = dataBase.Todo;

//var data = [{item: 'Keep'}, {item: 'Coding'}];

module.exports = function(app){
  
  app.get('/todo', function(req,res){
    // get data from mongodb and pass it to the view
    Todo.find({},function(err, data){
      if(err) throw err;
      res.render('todo',{todos: data})
    }); // to find specific -> {item: 'buy flowers};
  });


  app.post('/todo', urlencodedParser,function(req,res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if(err => console.log(err));
      res.json(data);
    })
    //data.push(req.body);
    //res.render("todo", {todos:data});
  });


  app.delete('/todo/:item', function(req,res){
    // detele requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).deleteOne(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });
}
/*
      data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.render("todo", {todos:data});
  });


};*/