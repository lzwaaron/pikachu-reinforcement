// server/routes/apiRouter.ts

const express = require('express');
const restaurantController = require('../controllers/restaurantController')
const sqlController = require('../controllers/sqlController.js')

const apiRouter = express.Router();

apiRouter.post('/addFav', sqlController.addFav, (req,res) => {
  res.status(200).json(res.locals.saveFav);
})

apiRouter.get('/restaurants', restaurantController.fetchRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants);
});

module.exports = apiRouter;
