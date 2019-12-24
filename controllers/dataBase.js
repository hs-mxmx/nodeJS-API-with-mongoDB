// Connect to DB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbUser@myapicluster-prdmw.gcp.mongodb.net/test?retryWrites=true&w=majority',{
  useCreateIndex: true,
  useNewUrlParser: true
})
.then(db => console.log('[+] Connection stablished with mongoDB...'))
.catch(err => console.error(err));

// Create a schema - like blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

// model
var Todo = mongoose.model('Todo', todoSchema);

// export modules
module.exports = {
  Todo: Todo
}
  
/*
      data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.render("todo", {todos:data});
  });


};*/