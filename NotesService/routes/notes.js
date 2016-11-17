 
var express = require('express');
var router = express.Router();
var Model = require('../model/model').Model;

// get list of notes
router.get('/', function(req, res, next) {
    Model.Note.find().exec()
        .then((notes) => {
            res.send(
                notes.map(
                    (dbNote) => {
                        var note = dbNote.toObject();
                        delete note._id;
                        delete note.__v;
                        return note;
                    }
                    )
                );
        })
        .catch((err) => {
            res.status(500).send();
        });
});

// get note by id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Model.Note.findOne({ id: id }).exec()
        .then((dbNote) => {
            if (!dbNote)
                throw Error("Not found");
            
            var note = dbNote.toObject();
            delete note._id;
            delete note.__v;
            res.send(note);
        })
        .catch((err) => {
            var msg;
            if (err && err.message)
                msg = err.message;
            res.status(500).send(msg);
        });
});

// create new note
router.post('/', function(req, res, next) {
    var note = req.body;
    try {
        if (!note)
            throw new Error("No payload");
        
        var dbNote = Model.Note.create(note)
            .then((dbNote) => {
                var note = dbNote.toObject();
                delete note._id;
                delete note.__v;
                res.send(note);
            })
            .catch((err) => {
                res.status(500).send();
            })
    } catch(e) {
        res.status(500).send(e.message);
    }
});

// update a note
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var note = req.body;
    if (!note || !note.id) {
        res.status(500).send("No payload");
        return;
    }

    Model.Note.findOneAndUpdate({ id: id }, note).exec()
        .then((dbNote) => {
            if (!dbNote)
                throw Error("Error");
            res.status(200).send("OK");
        })
        .catch((err) => {
            var msg;
            if (err && err.message)
                msg = err.message;
            res.status(500).send(msg);
        });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Model.Note.findOneAndRemove({ id: id }).exec()
        .then((dbNote) => {
            if (!dbNote)
                throw Error("Error");
            res.status(200).send("OK");
        })
        .catch((err) => {
            var msg;
            if (err && err.message)
                msg = err.message;
            res.status(500).send(msg);
        });
});

module.exports = router;
