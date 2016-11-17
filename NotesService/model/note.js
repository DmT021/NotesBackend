
var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    id: { type: String, index: true },
    title: String,
    desc: String,
    color: String,
    colorId: Number,
    order: Number
});

var Note = mongoose.model('Note', noteSchema);

exports.Note = Note;