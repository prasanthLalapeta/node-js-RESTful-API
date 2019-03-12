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
