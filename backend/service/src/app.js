const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = 3000;

const pageRoutes = require('./routes/pageroutes');
const weatherRoutes = require('./routes/weather');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../frontend/public')));

app.use('/', pageRoutes);
app.use('/', weatherRoutes);
app.use('/', authRoutes);


app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});