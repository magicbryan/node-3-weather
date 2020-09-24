const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup  handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bryan Robertson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bryan Robertson'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jimmy Buttfart',
        message: 'Save Yourself'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
    
            const data = forecastData
    
    
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
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
        title: 'Help Article not Found',
        name: 'Barney Flutist',
        errorMessage: 'stepped in pp'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        name: 'Weiner Man',
        errorMessage: 'smells like toast'
    })
})

app.listen(port, () => {
    console.log('server is up on port' + port)
})