const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
const hbs = require('hbs');
const { registerPartials } = require('hbs');

const hostname = '192.168.43.162';
const PORT = process.env.PORT || 3000;
const ErrorHandler = require('./errors/ErrorHandler');

app.use(express.urlencoded({ extended: false }));
const staticpath = path.join(__dirname, '../public');

const templatepath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.use(express.static(staticpath));

app.set('view engine', 'hbs');
app.set('views', templatepath);
hbs.registerPartials(partialspath);

app.use(router);

//global Error handler
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
    //console.log('Error', err.message);

    //next();
})


app.listen(PORT, () => console.log(`Server is running on ${hostname}:${PORT}`));