const mongoose = require('mongoose');
const config = require('config');

const connection_string = config.get('mongodb_uri_dev');

const connect_db = () => {
      
    mongoose.connect(connection_string, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log("database connected");
            })
            .catch((err) => {
                console.log(err);
                process.exit(1);
            })
}

module.exports = connect_db;