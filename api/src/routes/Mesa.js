const express = require("express");
const Mesa = require('../models/Mesa');
const { default: mongoose } = require("mongoose");
const Pedido = require("../models/Pedido");
const routerMesa = express.Router()

routerMesa.get('/', async function (req, res) {
    const mesas = await Mesa.find({});
    return res.status(200).json({ message: "OK!", data: mesas })
})
routerMesa.get('/:id', async function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const mesa = await Mesa.findById(req.params.id)
        return res.status(200).json({ message: "OK!", data: mesa })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
routerMesa.post('/', async function (req, res) {
    const { num_de_cadeira, referencia } = req.body
    if (!num_de_cadeira)
        return res.status(400).json({ message: "defina o numero de cliente" })
    if (!referencia)
        return res.status(400).json({ message: "defina a referencia da mesaa." })
    try {
        await Mesa.create({ num_de_cadeira, referencia })
        return res.status(200).json({ message: "A mesa foi definida com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
routerMesa.put('/:id', async function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const mesaUpdated = await Mesa.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({ message: "OK!", data: mesaUpdated })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
routerMesa.put('/:id/ocupar', async function (req, res) {

    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const pedido = await Pedido.findOne({ cliente_ref: req.cookies['CLIENT_KEY_RS'] })

        if (!pedido)
            return res.status(400).json({ message: "Pedido não registrado" })

        const mesa = await Mesa.findOne({ _id: req.params.id })
        if (!mesa)
            return res.status(400).json({ message: "Pedido não registrado" })

        if (mesa.ocupada)
            return res.status(400).json({ message: "Esta mesa já esta ocupada" })

        await Mesa.updateOne({ ocupada: true, pedido: pedido._id })

        return res.redirect('/')

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
})
routerMesa.put('/:id/desocupar', async function (req, res) {

    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {

        await Mesa.updateOne({ _id: req.params.id }, { ocupada: false, pedido: null })

        return res.status(200).json({ message: "OK!" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = app => app.use('/api/mesas', routerMesa);
