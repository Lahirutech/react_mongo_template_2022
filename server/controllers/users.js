const router = require('express').Router();

const UserModel = require('../models/user.model');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/profile', async(req, res, next) => {
    console.log("req.user", req.user)
    res.send("LogProfilein")
})

router.get('/userdata', async(req, res, next) => {
    res.send("Userdata")
})

router.post('/register', async(req, res, next) => {
    try {
        const { email } = req.body;
        const doesExist = await User.findOne({ email });
        if (doesExist) {
            req.flash('warning', 'Username/email already exists');
            res.redirect('/auth/register');
            return;
        }
        const user = new User(req.body);
        await user.save();
        req.flash(
            'success',
            `${user.email} registered succesfully, you can now login`
        );
        res.redirect('/auth/login');

    } catch (error) {
        console.log("Error", error)
        next(error)
    }
})


router.post('/login', (req, res) => {
    UserModel.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })

    })
})


module.exports = router