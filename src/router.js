const router = require('express').Router();
require('./db/conn');
const User = require('./models/usermessage');
const ErrorHandler = require('./errors/ErrorHandler');


// app.get() callback function
router.get('/', (req, res) => {
    res.render('index');
})

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


module.exports = router;