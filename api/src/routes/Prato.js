const express = require("express");
const { default: mongoose } = require("mongoose");
const Pedido = require('../models/Pedido');
const Mesa = require("../models/Mesa");
const routerPrato = express.Router()
const http = require('http')
const { promisify } = require('util');
const { default: axios } = require("axios");
const { Respt } = require("../Util");

routerPrato.get('/', async function (req, res) {
    try {

        const ApiResponse = await axios.get('http://localhost:5000/api/produtos?ct=1')
        const respt = new Respt({
            data: ApiResponse.data.produtos,
            message: "OK!",
            status: 200
        })

        return res.status(respt.getStatus()).json(respt.response)
    } catch (err) {
        console.error("ERROR: ", err.message)
    }
})
routerPrato.get('/:id', async function (req, res) {

    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ message: "ID invalido!" })
    try {
        const apiResponse = await axios.get('http://localhost:5000/api/produtos/' + req.params.id + '?ct=1')
        
        const respt = new Respt({
            data: apiResponse.data.produto,
            message: "OK!",
            status: 200
        })

        return res.status(respt.getStatus()).json(respt.response)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
// routerPrato.post('/', async function (req, res) {
//     const { nome, num_de_cliente } = req.body

//     if (!nome)
//         return res.status(400).json({ message: "defina o seu nome" })

//     if (!num_de_cliente)
//         return res.status(400).json({ message: "número de cliente invalido." })

//     req.body.cliente_ref = req.cookies['CLIENT_KEY_RS']

//     try {
//         const pedido = await Pedido.create(req.body)
//         return res.status(200).json({ message: "A pedido foi definida com sucesso!", data: pedido })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })
// routerPrato.put('/:id', async function (req, res) {
//     if (!mongoose.isValidObjectId(req.params.id))
//         return res.status(400).json({ message: "ID invalido!" })
//     try {
//         const pedidoUpdated = await Pedido.findByIdAndUpdate(req.params.id, req.body)
//         return res.status(200).json({ message: "OK!", data: pedidoUpdated })

//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })


module.exports = app => app.use('/api/pratos', routerPrato);
