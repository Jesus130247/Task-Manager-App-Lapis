require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const saltRounds = 10;

router.post('/todolist/signUp', async (req, res, next) => {
    const { username, password } = req.body
    let salt = await bcrypt.genSalt(saltRounds)
    let hash = await bcrypt.hash(password, salt)
    if (username.trim() !== '' || password !== '') {
        return await User.createUser(username.trim(), hash).catch((err) => {
            next(err)
        })
    } else {
        throw new Error
    }
})

router.post('/todolist/login',  async (req, res, next) => {
    try {
        const { username, password } = req.body

        let user = await User.findByUsername(username)
        if (!user) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        let match = await bcrypt.compare(password, user.password_disgest)
        if (!match) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        const token = jwt.sign (
            { id: user.id, username: user.username},
            'cakepudding', 
            { expiresIn: '24h'}
        )

        res.json({ token: token })

    } catch (err) {
        next(err)
    }

})

module.exports = router