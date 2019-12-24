
# nodeJS-API && mongoDB

***API is gonna be structured following MVC structure***

> **Model: Data**
- TODOS
- USERS

> **View: Template Files (EJS)**
- TODO.EJS
- ACCOUNT.EJS

> **Controller: Controls the APP, selections**
- todoController
- userController

<img src="https://www.cleveroad.com/images/article-previews/what-is-mvc.png" tittle="MVC Structure">

---

## 1 - Create APP, set View Engine, and set static middleware:
```javascript
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files with middleware
app.use(express.static('./public'));

// listen to port
const port = 5000;
app.listen(port, "127.0.0.1");
console.log(`Server listening on port ${port}...`);
```

---

## 2 - Create controllers folder
> todoController.js, dataBase.js...

**inside app.js:** 
```javascript
todoController = require('/controllers/todoController.js);
todoController(app);  //We give our app to be handled and manipulated to the controller
```
**inside todoController.js:**
```javascript
module.exports = function(app){  We export the whole function with methods inside
  app.get('/todo', function(req,res){...});
  app.post('/todo', urlencodedParser,function(req,res){...}); // urlencodedParser to handle body 
  app.delete('/todo/:item', function(req,res){...})
}
```

---

## 3 - Create views and todo-list.js
**inside public/assets:**
- handle html code inside todo.ejs in relation with assets' files (logo,styles...)
- look for jQuery CDN script inside todo.ejs code
**inside todoController.js:**
- handle res.render(todo) on app.get('/todo');

---

## 4 - Handle Adding and Deleting items:
**understanding todo-list.js with ajax:**
- ***submit method:*** adding new item value set on 'input form' to todo's array, send new data via POST request to same URL by realoading url
- ***deleting method:*** deleting item clicked on URL 'li form' replacing new text and sending it back via DELETE request to same URL by realoading url

> modify POST and DELETE requests on todoController.js
- ***POST:*** push new data send via REQ to data's array and reaload page with the new data
- ***DELETE:*** filter data by looping on the data's array to find req.params, once it is found, it will be replaced

---

## 5 - Create mongoDB and stablish connection to Atlas
- install **mongoose** to stablish connection via nodeJS
- create **Schema** for data that gonna be added to our mongoDB
```javascript
// Create a schema - like blueprint
var todoSchema = new mongoose.Schema({
  item: String
});
```
- create **Model** with our schema and our model name
```javascript
// Create a model
var Todo = mongoose.model('Todo', todoSchema);
```

---

## 6 - Modify our requests with new mongoDB data
**app.get:**
- Todo.find({},function(err,data))... it will return everything from the db and will save it into data variable

**app.post:**
- newTodo = Todo(req.body).save(err,data)...
- Todo -> is the model we've already created
- req.body -> data from POST request

**app.delete:**
- Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data)
- find item from 'Todo' model ande replace it with " " 
