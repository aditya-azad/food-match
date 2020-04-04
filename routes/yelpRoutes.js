const yelpClient = require('../services/yelp').client;

// all the params passed to the url like /?a=23&b=21 gets attached to req.query object
module.exports = (app) => {
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
