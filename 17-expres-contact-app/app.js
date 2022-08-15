const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact} = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const app = express()
const port = 3000

app.set('view engine', 'ejs')

//Third-party Middleware
app.use(expressLayouts)

//built in middleware
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))

//konfigurasi flash
app.use(cookieParser('secret'))
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(flash())

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
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main',
    title: 'Contact',
    contacts,
    msg: req.flash('msg')
  })
})

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main',
    title: 'Detail Contact',
  })
})

app.post(
  '/contact', 
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value)
      if(duplikat) {
        throw new Error('Nama terdaftar');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No HP tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        layout: 'layouts/main',
        title: 'Add Contact',
        errors: errors.array()
      })
    } else {
      addContact(req.body)
      req.flash('msg', 'Berhasil ditambahkan')
      res.redirect('/contact')
    }
})

app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  //jika tidak ada
  if(!contact) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deleteContact(req.params.nama)
    req.flash('msg', 'Berhasil dihapus')
    res.redirect('/contact')
  }
})

//route edit
app.get('/contact/edit/:nama', (req, res) => {

  const contact = findContact(req.params.nama)
  res.render('edit-contact', {
    layout: 'layouts/main',
    title: 'Edit Contact',
    contact
  })
})

app.post(
  '/contact/update', 
  [
    body('nama').custom((value, {req}) => {
      // console.log(`lama${req.body.oldNama}yaa`);
      const duplikat = cekDuplikat(value)
      if(value !== req.body.oldNama && duplikat) {
      // if(duplikat) {
        throw new Error('Nama terdaftar');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No HP tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('edit-contact', {
        layout: 'layouts/main',
        title: 'Edit Contact',
        errors: errors.array(),
        contact: req.body
      })
    } else {
      // res.send(`lama${req.body.nama}baru${req.body.oldNama}yaa`)
      updateContact(req.body)
      req.flash('msg', 'Berhasil diubah')
      res.redirect('/contact')
    }
})

app.get('/contact/:nama', (req, res) => {
    
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout: 'layouts/main',
    title: 'Detail Contact',
    contact
  })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404 Not Found</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})