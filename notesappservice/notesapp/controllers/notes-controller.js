Note = require('../models/note-model');

exports.index = function (req, res) {
    Note.get(function (err, notes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            note: notes
        });
    });
};

exports.new = function (req, res) {
    var note = new Note();
    note.title = req.body.note.title ? req.body.note.title : note.title;
    note.content = req.body.note.content;
    note.isPinned = req.body.note.isPinned ? req.body.note.isPinned : false;
    note.image = req.body.note.image ? req.body.note.image : null;
    note.background = req.body.note.background ? req.body.note.background : null;
    
    note.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                note: note
            });
    });
};

exports.view = function (req, res) {
    Note.findById(req.params.note_id, function (err, note) {
        if (err)
            res.send(err);
        res.json({
            note: note
        });
    });
};

exports.update = function (req, res) {
    Note.findById(req.params.note_id, function (err, note) {
        if (err)
            res.send(err);
            
        note.title = req.body.note.title ? req.body.note.title : note.title;
        note.content = req.body.note.content;
        note.isPinned = req.body.note.isPinned;
        note.background = req.body.note.background;
        note.isDone = req.body.note.isDone ? req.body.note.isDone : false;
      
        note.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                note: note
            });
        });
    });
};

exports.delete = function (req, res) {
    Note.deleteOne({
        _id: req.params.note_id
    }, function (err, note) {
        if (err)
            res.send(err);
        res.json({
        });
    });
};