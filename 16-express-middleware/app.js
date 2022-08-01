const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

//Third-party Middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//application middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})

//built in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {root: __dirname})
  const mahasiswa = [
    {
      nama: 'Nendi',
      email: 'nendi@gmail.com'
    },
    {
      nama: 'Apri',
      email: 'apri@gmail.com'
    },
    {
      nama: 'Bambang',
      email: 'bambang@gmail.com'
    }
  ]

  res.render('index', {
    nama : 'Nendi',
    title: 'Home',
    mahasiswa,
    layout: 'layouts/main',
    title: 'Home'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main',
    title: 'About'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main',
    title: 'Contact'
  })
})

app.get('/product/:id', (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Cetegory: ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404 Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})