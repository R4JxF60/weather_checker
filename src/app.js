const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);


app.get('/weather', (req, res, next) => {
    res.render('index', {title: 'Weather'});
});


app.post('/get-weather', (req, res, next) => {
    res.send({"res" : "sample"});
});

app.get('/', (req, res, next) => {
    res.render('index', {title: 'Weather'});
});



app.listen(3000, () => {
    console.log(viewPath)
    console.log('Server is up and running!');
});