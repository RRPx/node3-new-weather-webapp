// Hello
const path = require('path')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const express = require('express')   // express is a function
const hbs = require('hbs')
const { readFile } = require('fs')

const app = express()
const port = process.env.PORT || 4000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com, app.com/help, app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Md. Hudson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Md. Hudson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'What keeps you stronger?',
        title: 'Help',
        name: 'Md. Hudson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geoCode(req.query.address, (error, {lat, lon}) => {
        if (error) {
            return res.send({
                error: 'GeoCode failed to operate'
            })
        }
    
        foreCast(lat, lon, (error, { temp, wind }) => {
            if (error) {
                return res.send({
                    error: 'ForeCast failed to operate'
                })
            }
            res.send({
            forecast: `The temperature will be ${temp}°C, wind speed at ${wind} km/h`,
            location: req.query.address
    })
})
})

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        errorMessage: 'Help article not found',
        name: 'Md. Hudson'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        errorMessage: 'Page not found',
        name: 'Md. Hudson'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})