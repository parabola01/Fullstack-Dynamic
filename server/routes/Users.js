const express = require('express');
const router = express.Router();
const {users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const {validateToken} = require("../middlewares/AuthMiddelware")


//tworzę użytkownika
router.post("/", async (req, res) => {
    const {username, email, password} = req.body;

    bcrypt.hash(password, 12).then((hash) => {
        users.create({
            username: username,
            email: email,
            password: hash,
        })
        res.json("Success")
    });
});

//logowanie
router.post("/login", async (req,res) => {
    const {username, password} = req.body;
    const user = await users.findOne({ where: {username: username}});

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    }else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" });
            } else {
                const accessToken = sign({username: user.username, id: user.id}, "randomLetters")
                res.json({token: accessToken, username: username, id: user.id});
            }
        });
    }
});

//sprawdzam czy użytkownik jest autoryzowany
router.get('/valid', validateToken, (req,res) =>{
    res.json(req.user);
})

router.get("/info/:id", async (req, res) => {
    const id = req.params.id;

    const info = await users.findByPk(id, {attributes: {exclude: ['password']}});
    res.json(info);
})

module.exports = router;