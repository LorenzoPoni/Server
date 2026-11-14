const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const config = require('../config/env');
const paths = require('../config/paths');
const googleAuthRoutes = require(paths.ROUTES + '/authRoutes');
const session = require('express-session');
const passport = require('../config/passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // il JS del browser non può leggere il cookie
        sameSite: 'lax', // necessario per il ritorno da Google (navigazione top-level)
        secure: config.NODE_ENV === 'production', // solo HTTPS in produzione
        maxAge: 1000*60*60*8 //8 ore 
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleAuthRoutes); 

app.listen(config.AUTH_PORT, () => {
    console.log(`Service 2 (API) avviato su http://localhost:${config.AUTH_PORT}`);
});