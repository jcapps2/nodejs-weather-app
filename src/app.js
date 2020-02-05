// Andrew typically requires in core modules before npm modules.
// Not necessary, but a nice bit of organization.
const path = require('path')            // check node docs for more info
const express = require('express')      // obviously npm module
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')   // manipulating file path
const viewsPath = path.join(__dirname, '../templates/views')          // customized hbs path (default )
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')                             // setting up handlebars (npm hbs)
app.set('views', viewsPath)                                 // pointing express to new path
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))      // telling express to use static html file in public directory

app.get('', (req, res) => {
    res.render('index', {       // rendering index.hbs
        title: 'Weather',
        name: 'Jacob Capps'
    })       
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jacob Capps'
    })     
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some helpful text',
        title: 'Help',
        name: 'Jacob Capps'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: '50 degrees',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
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
    res.render('404', {
        title: '404',
        name: 'Jacob Capps',
        errorMessage: 'Help article not found'
    })
})

// * is wildcard character, meaning it will catch everything else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jacob Capps',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})