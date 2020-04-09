const yelpClient = require('../services/yelp').client;
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

module.exports = (app) => {
  app.post(
    '/api/save_restaurant', requireLogin, 
    (req, res) => {
      let userID = req.user.id;
      let restaurant = req.body.restaurant_id;
      let conditions = { _id: userID, 'restaurants': { $ne: restaurant }};
      let update = { $addToSet: { restaurants: restaurant } };
      User.findOneAndUpdate(conditions, update).exec();
    }
  );

  app.get(
    '/api/get_restaurant_by_id',
    (req, res) => {
      yelpClient.business(
        req.query.restaurant_id
      ).then(response => {
        res.send(response);
      });
    }
  )

  app.get(
    '/api/search',
    (req, res) => {
      //yelpClient.search({term: req.query.term, location: req.query.location})
      let term = req.query.term;
      let location = req.query.location;
      let latitude = req.query.latitude;
      let longitude = req.query.longitude;

      if (location) {
        yelpClient.search({
          term,
          location,
          categories: "restaurants"
        }).then(response => {res.json(response.jsonBody)})
          .catch(e => {
            res.send({error: JSON.parse(e.response.body).error});
        });
      } else {
        yelpClient.search({
          term,
          latitude,
          longitude,
          categories: "restaurants"
        }).then(response => {res.json(response.jsonBody)})
          .catch(e => {
            res.send({error: JSON.parse(e.response.body).error});
        });
      }
    }
  );
}
