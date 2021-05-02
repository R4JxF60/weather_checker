const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})



app.listen(3000, () => {
    console.log('Server is up and running!')
})