let router = require('express').Router();

router.get('/', function (req, res) {
    
    res.json({
        status: 'API Its Working',
        message: 'Welcome to NotesApp',
    });
});

var noteController = require('./notes-controller');

router.route('/notes')
    .get(noteController.index)
    .post(noteController.new);

router.route('/notes/:note_id')
    .get(noteController.view)
    .patch(noteController.update)
    .put(noteController.update)
    .delete(noteController.delete);

module.exports = router;