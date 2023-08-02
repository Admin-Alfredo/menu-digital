const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const routesMesa = require('./routes/Mesa')
const routesPedido = require('./routes/Pedido')
const routesPrato = require('./routes/Prato')
const { default: mongoose } = require('mongoose');
const Pedido = require('./models/Pedido');


const http = require('http');
const path = require('path');


const PORT = 3200
const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    if (!req.cookies['CLIENT_KEY_RS']) {
        res.cookie('CLIENT_KEY_RS', uuidv4())
        return res.redirect(200, '/cliente');
    }
    return res.redirect(200, '/cliente');
})
app.get('/cliente', function (req, res) {
    let cookieUser;
    if (!req.cookies['CLIENT_KEY_RS']) {
        cookieUser = uuidv4()

        res.cookie('CLIENT_KEY_RS', cookieUser)
    }
    return res.sendFile(__dirname + '/views/page.pedido.html', {})
})
app.get('/mesas', async function (req, res) {
    if (!req.cookies['CLIENT_KEY_RS']) {
        res.cookie('CLIENT_KEY_RS', uuidv4())
        return res.redirect(200, '/cliente');
    }
    if (!mongoose.isValidObjectId(req.query.pid))
        return res.redirect('/cliente?error=id do pedido invalido')
    try {
        await Pedido.updateOne({ _id: req.query.pid }, { cliente_ref: req.cookies['CLIENT_KEY_RS'] })
        return res.sendFile(__dirname + '/views/page.mesas.html', {})
    } catch (error) {
        return res.redirect('/cliente?error=500 erro no serviodr')
    }

})
app.get('/menu', function (req, res) {
    if (!req.cookies['CLIENT_KEY_RS']) {
        res.cookie('CLIENT_KEY_RS', uuidv4())
        return res.redirect(200, '/cliente');
    }

    return res.sendFile(__dirname + '/views/page.menu.html', {})

})
routesMesa(app)
routesPedido(app)
routesPrato(app)
app.listen(PORT, () => console.log(`LINSTENER ON PORT ${PORT}`))