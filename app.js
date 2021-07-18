require('./config/config.js');
require('./models/dbConfig.js');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const jwtHelper = require('./config/jwtHelper');
const logger = require("./Utils/tracer");
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',jwtHelper.verifyJwtToken, blogRoutes);

// create server
app.listen(process.env.PORT, () => logger.info(`Server started at port : ${process.env.PORT}`));