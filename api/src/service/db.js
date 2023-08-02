const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/restaurante', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  family: 4,
})
  .then(res => {
    console.log('API CONNECT DB RESTAURANTE')
  }).catch(err => {
    console.error("[MONGOOSE ERROR] ", err.message)
  })
mongoose.Promise = global.Promise

module.exports =  mongoose