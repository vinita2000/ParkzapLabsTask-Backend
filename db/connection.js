const mongoose = require('mongoose');

const url = process.env.DBURL;
console.log(url);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});