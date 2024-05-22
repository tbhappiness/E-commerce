const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const PORT = 3003;
const User = require('./models/users');

app.use(async(req, res, next) => {
    req.user = await User.findOne({
        _id: "6639ce704c03efe34f8a6fdd"
    });
    next();
})

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
})


const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);
// app.use('/user', );
// app.use('/superadmin')

const shopRouter = require('./routes/shop');
app.use('/shop', shopRouter);


mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
.then(() => {
    console.log('db connection successfully');
    app.listen(PORT, () => {
        console.log('http://localhost:'+PORT);
    })
})
.catch((err) => {
    console.log(err);
})
