const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', (err) => {
    if (!err)
        console.log('mongodb connection');
    else
        console.log('error in mongdb connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;