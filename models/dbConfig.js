const mongoose = require('mongoose');

//used to connect database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}, (err) => {
    if (!err) { console.log('succeessfull'); }
    else { console.log('Error in connection : ' + err); }
});

require('./user.model');
require('./blog.model');