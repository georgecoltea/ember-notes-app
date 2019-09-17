let router = require('express').Router();

const noteController = require('../controllers/notes-controller');
const userController = require('../controllers/users-controller');

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

router.route('/notes')
    .get(noteController.index)
    .post(noteController.new);

router.route('/notes/:note_id')
    .get(noteController.view)
    .patch(noteController.update)
    .put(noteController.update)
    .delete(noteController.delete);

module.exports = router;