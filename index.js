const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport'); // we just need the code in it to be executed

mongoose.connect(keys.mongoURI);

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// initialize routes
require('./routes/authRoutes')(app);
require('./routes/yelpRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));
  // Express will serve up index.html if route not recognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
