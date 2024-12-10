require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Cards = require('../models/Cards')

router.get(`/todolist/user/cards/:user_id`, async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const cards = await Cards.getCards(user_id);
        res.json(cards); 
    } catch (err) {
        next(err); 
    }
});

router.get('/todolist/card/nextVal', async (req, res, next) => {
    try {
        const nextId = await Cards.nextVal(); 
        return res.json(nextId);     
    } catch (err) {
        next(err); 
    }
});

router.post('/todolist/create/card/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id
    const card_info = req.body
    return Cards.createCard(user_id, card_info)
})

router.put('/todolist/update/card/', async (req, res, next) => {
    const card_info = req.body
    return Cards.editCard(card_info)
})

router.delete('/todolist/delete/card/', async (req, res, next) => {
    const card_id = req.body.card_id
    return Cards.deleteCard(card_id)
})


module.exports = router