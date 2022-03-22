const router = require('express').Router();

const UsersController = require('../controllers/users');
const User = require('../models/user.model');

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
            res.send({ message: "user already exist" })
                // res.redirect('/auth/register');
            return;
        }
        const user = new User(req.body);
        await user.save().then(user => {
            res.send({
                success: true,
                message: "User created successfully",
                user: {
                    id: user._id,
                    email: user.email
                }
            })
        }).catch(err => {
            res.send({
                success: false,
                message: "something went wrong when saving",
                error: err
            })
        })

    } catch (error) {
        console.log("Error", error)
        res.status(500).send(error)
    }
})


router.post('/login', async(req, res, next) => {
    res.send("Login")
})



module.exports = router