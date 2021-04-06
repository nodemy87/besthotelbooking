if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const router = require('express').Router();
require('./db/conn');

const User = require('./models/usermessage');

const ErrorHandler = require('./errors/ErrorHandler');

// user autication code
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//End autication code

const users = [];

// autication code

router.use(flash())
    /*router.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))*/

router.use(session({
    secret: 'secretidhere',
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

//End autication code

// app.get() callback function
/*router.get('/', (req, res) => {
    res.render('index');
})*/


router.get('/about', (req, res) => {
    res.render('about');
})

router.get('/services', (req, res) => {
    res.render('services');
})

router.get('/portfolio', (req, res) => {
    res.render('portfolio');
})

router.get('/team', (req, res) => {
    res.render('team');
})
router.get('/contact', (req, res) => {
    res.render('contact');
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('user/login');
})

router.get('/', (req, res) => {
    //res.render('index');
    console.log("sas");
    res.render('home')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {

    res.render('user/register');
})
router.post('/register', checkNotAuthenticated, async(req, res) => {
    const { name, email, password } = req.body;
    //console.log(username);
    try {

        const hashedPssword = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString,
            name: name,
            email: email,
            password: hashedPssword
        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    console.log(users);

})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

router.post('/contact', async(req, res, next) => {
    try {
        // res.send(req.body);
        const userdata = new User(req.body);
        await userdata.save();
        res.status(201).render('contact');
        //next();

    } catch (error) {
        next(ErrorHandler.validationError(error.message));
    }

    //const { name, price } = req.body;
    //console.log(req.body);

    //if (!name || !price) {
    //next(ErrorHandler.validationError('price are compulsory'));
    //throw new Error('All Fields are compulsory');

    /*res.status(422).json({
        error: "all fileds are compulsory"
    })*/
    //}


});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.render('home')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.render('home')
    }
    next()
}

module.exports = router;