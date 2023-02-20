const colors = require('colors');
const mongoose = require('mongoose')


mongoose.set('strictQuery', true);

const connect = () => {
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => console.log('> Connected...'.green))
        .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))
}

module.exports = connect