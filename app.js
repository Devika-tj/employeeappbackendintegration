const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const connectDB = require('./connection');
const employeeroutes = require('./routes/employeeroutes');

const app = express();


connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api', employeeroutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
