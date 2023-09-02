require('dotenv').config();

const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000 || process.env.PORT;

app.use(session({
    secret: 'somevalue',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// db connected
connectDB();
//Static
app.use('/public', express.static('public'));

app.use(expresslayouts);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');



//Routes
app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/dashboard'))
app.use('/', require('./server/routes/auth'))

//Error 
app.get('*', (req, res) => {
    res.status(404).render("404")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
