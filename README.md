# Build your first RESTful API with NodeJs and MongoDB (TodoAPP)

## REST API?

REST APIs handle the server side of the web application. That means that the backend is built once and can provide content or data for frontend, mobile, or other server-side apps. REST stands for Representational State Transfer and is a way how a web server should respond to requests. This allows to not only read data, but also do different things like updating, deleting or creating data.

A great example is the google calendar API.

## Prequisites :

NodeJS

## Development Environment :

* Plain JavaScript
* Node.js
* Express (JS framework)
* MongoDB (Database)
* npm (package management)
* Atom/Sublime as editor
* Postman (testing APIs)

## Packages Used :

* body-parser (for parsing incoming requests)
* express (to make the application run)
* nodemon (restarting server when changes occur)
* mongoose (object data modeling to simplify interactions with MongoDB)

## STEPS :

**1. npm install --save express body-parser mongoose**

**2. npm install --save-dev nodemon**

**3. touch server.js**

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// initialize our express app
const app = express();
const port = process.env.PORT || 2000;

// get our server running
app.listen(port, () => {
    console.log("App up and running on" + port);
});
```

**4. "start": "node server.js" >> package.json in scripts**
**5. npm start and you’d see the log.**
**6. File Structure :**

  We need to structure or directory so we have dedicated files for various actions — routes, models,
  and controllers. Go ahead and create the following directory structure:

```
  --todoApp
      - api
          - models
          - controllers
          - routes
      - node_modules
      - server.js
      - package.json
      ...
```

  We create the dedicated files in their directories- **api/models/todoModel.js api/controllers/todoController.js api/routes/todoRoutes.js** Your directory structure should look like this now:

      ```
      --todoApp
        - api
            - models
                - todoModel.js
            - controllers
                - todoController.js
            - routes
                - todoRoutes.js
        - node_modules
        - server.js
        - package.json
        ...
        ```

**7. Routing : Create your first route (Routes)**

 ```
 // api/routes/todoRoutes.js

  module.exports = (app) => {
      let todoList = require('../controllers/todoController');
      // our Routes
      app.route('/tasks')
          .get(todoList.getTasks)
          .post(todoList.createTask);

      app.route('/tasks/:taskId')
          .get(todoList.readTask)
          .put(todoList.updateTask)
          .delete(todoList.deleteTask);
  }
  ```

In the code above, the API’s routes are defined under different verbs; when a request is made for the tasks route e.g todoApp.dev/tasks, it calls the getTasks method from the required todoList controller, same for the post, put, and delete routes. The tasks/:taskId route, handles a single task. We can grab a task via its ID - /tasks/3 update or delete it too.

**8. Database Schema : (Models)**

We’ll be using Mongoose to interact with a MongoDB instance. In the todoModel.js file, we’ll define a schema for our Tasks collection. With Mongoose, we can create Schemas easily by defining the fields and their types. You’ll need to have MongoDB server installed locally, if you want to serve your database. You can also use a remote database, there’s a free tier from MLab(https://mlab.com/)

Here we are going to use MLab(https://mlab.com/)

 ```
 // api/models/todoModel.js

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  let TaskSchema = new Schema({
      name: {
          type: String,
          Required: 'Task label is required!'
      },
      Created_date: {
          type: Date,
          default: Date.now
      }
  });
  module.exports = mongoose.model('Tasks', TaskSchema);
  ```

In the taskModel file, we created a schema for it. As you can see, it the task collection(table) will contain a name: a string, and the date it was created.

**9. Setting up Controllers**

  ```
  // api/controllers/todoController.js

  const mongoose = require("mongoose");
  const Task = mongoose.model("Tasks");
  // get all tasks
  exports.getTasks = (req, res) => {
      Task.find({}, (err, task) => {
          if (err)
              res.send(err);

          res.json(task);
      });
  };
  // create a task
  exports.createTask = (req, res) => {
      let newTask = new Task(req.body);
      newTask.save( (err, task) => {
          if (err)
              res.send(err);

          res.json(task);
      });
  };
  // read a single task
  exports.readTask = (req, res) => {
      Task.findById(req.params.id, (err, task) => {
          if (err)
              res.send(err);
          res.json(task);
      });
  };
  // update a particular task
  exports.updateTask = (req, res) => {
    Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, task) => {
      if (err)
          res.send(err);
      res.json(task);
    });
  };
  // delete a single task
  exports.deleteTask = (req, res) => {
      Task.remove({
          _id: req.params.id
      }, (err, task) => {
          if (err)
              res.send(err);
          res.json({ message: 'Task deleted!!' });
      });
  };
  ```

**10. **Coupling everything :**

Back in our server.js file, we’ll connect to our database, by adding a URL to the mongoose connection instance, Load the created Model (task), register our created routes. Update your server.js file to look like this:

  ```
  // server.js

  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const Task = require("./api/models/todoModel");
  let routes = require("./api/routes/todoRoutes");

  // initialize our express app
  const app = express();
  const port = process.env.PORT || 2000;

  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:2001/todoApp"); // connect to MongoDB

  // handle incoming requests
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  routes(app); // register our routes

  // middleware to handle wrong routes
  app.use( (req, res) => {
      res.status(404).send({ url: req.originalUrl + 'not found' });
  });

  // get our server running
  app.listen(port, () => {
      console.log("App up and running on " + port);
  });
  ```

**11. Testing with Postman**

To test your API using postman, startup the server nodemon server.js and then open up the postman app and pass in your url

npm start

check http://localhost:2000/tasks in postman

To use the post method on postman, the Body should be set to x-www-form-urlencode

That’s it!
You have a working Node.js API which makes use of the four major HTTP verbs (GET, POST, PUT, DELETE).
