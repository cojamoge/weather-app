const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about', {
        title:'Weather App',
        name: 'Andrew Mead',
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help_message:'wiadomość pomocy',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} =  {}) => {
            if(error) {
              return res.send({
                  error
                })
            } 
        
            forecast(longitude, latitude, (error, forecast) => {
              if(error){
                return res.send({
                    error
                  })
              }
        
              res.send({
                  location,
                  forecast,
                  address: req.query.address
                })
            })
        
        })
    }

    // res.send({
    //     location: "Philadelfia",
    //     forecast: "raining",
    //     address: req.query.address
    // }) 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You mus provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error:'no help page',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error:'no page',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})