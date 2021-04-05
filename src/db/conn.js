const mongoose = require('mongoose');
const url = 'mongodb+srv://admin:manojshimpi@cluster0.u2ibq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection successful");
}).catch((error) => {
    console.log(error.message);
})