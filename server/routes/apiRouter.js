// server/routes/apiRouter.ts

const express = require('express');
const restaurantController = require('../controllers/restaurantController')

const apiRouter = express.Router();

apiRouter.get('/restaurants', restaurantController.fetchRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants);
});

module.exports = apiRouter;
