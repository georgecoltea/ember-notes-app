const bcrypt = require('../node_modules/bcrypt');
User = require('../models/user-model');

exports.register = (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            error = 'Email already exists';
            return res.status(400).json(error);
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.log('error register');
                    }

                    newUser.password = hash;

                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            error = "User not found";
            return res.status(404).json(error);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log('good');
                return res.status(200).json(user);
            } else {
                error = "Incorrect password";
                return res.status(400).json(error);
            }
        });
    });
};

