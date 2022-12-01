const express = require('express')
const router = express.Router()
const Log = require('../models/logs')


// Index route
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find({})
        res.render('Index', { logs })
    } catch (err) {
        res.send(err)
    }
})


// New route
router.get('/new', (req, res) => {
    res.render('New')
})


// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id)
        res.redirect('/logs')
    } catch (err) {
        res.send(err)
    }
})


// Update route
router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false
        await Log.findByIdAndUpdate(id, req.body)
        res.redirect(`/logs`)
    } catch (err) {
        res.send(err)
    }
})


// Create route
router.post('/', async (req, res) => {
    try {
        req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false
        const createdLog = await Log.create(req.body)
        res.redirect('/logs')
    } catch (err) {
        res.send(err)
    }
})

// Edit route
router.get('/:id/edit', (req, res) => {
    Log.findById(req.params.id)
        .then((log) => {
            res.render('Edit', { log })
        })
        .catch((err) => {
            res.send(err)
        })
})



// Show route
router.get('/:id', async (req, res) => {
    try {
        const log = await Log.findById(req.params.id)
        res.render('Show', { log })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router