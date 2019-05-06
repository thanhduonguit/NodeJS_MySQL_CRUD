const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

const app = express()

// import routes
const customerRoutes = require('./routes/customer');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(morgan('dev'))
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'))

app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', customerRoutes)

const PORT = process.env.PORT || 3012
app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));