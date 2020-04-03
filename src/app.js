const path = require('path')          
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const PORT = process.env.PORT || 3000      // Dynamically allocate port number via Heroku, or default 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')   // manipulating file path

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))      // telling express to use static html file in public directory

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
})

// * is wildcard character, meaning it will catch everything else
app.get('*', (req, res) => {
    res.status('404').json({     
        title: '404',
        name: 'Jacob Capps',
        errorMessage: 'Page not found'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})