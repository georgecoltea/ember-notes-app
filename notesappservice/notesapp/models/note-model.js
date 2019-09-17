var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    title: 'string',
    content: 'string',
    isPinned: Boolean,
    image: 'string',
    background: 'string',
    isDone: Boolean
},
{
    versionKey: false // You should be aware of the outcome after set to false
}
);

const Note = module.exports = mongoose.model('note', noteSchema);

module.exports.get = function (callback, limit) {
    Note.find(callback).limit(limit);
}