const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths dor Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Andrew"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        author: "HuDun"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: "HuDun"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide a address"
        })
    } else {
        geocode(req.query.address, (error, {
            latitude,
            longitude,
            location
        }) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                latitude,
                longitude,
                location,
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            "error": "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        "products": []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Help article not found",
        author: "HuDun"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found",
        author: "HuDun"
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})