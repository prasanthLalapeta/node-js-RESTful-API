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
