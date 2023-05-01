const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB ...');
  })
  .catch(err => {
    console.error('Could not Connect to MongoDb !!!', err);
  })
mongoose.exports = {connection}

