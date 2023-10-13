// server/routes/apiRouter.ts

const express = require('express');
const restaurantController = require('../controllers/restaurantController')
const mdbController = require('../controllers/mdbController.js')

const apiRouter = express.Router();

apiRouter.post('/saveLoc', mdbController.saveTo, (req,res) => {
  res.status(200).json({message: 'Document created', savedList: res.locals.user})
})
apiRouter.post('/getSaved', mdbController.getRows, (req,res) => {
  res.status(200).json({message: 'Rows acquired', savedList: res.locals.savedList["savedList"]});
})
apiRouter.post('/delLoc', mdbController.delete, (req,res) => {
  res.status(200).json({message: 'Rows acquired', savedList: res.locals.savedList["savedList"]});
})
apiRouter.get('/restaurants', restaurantController.fetchRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants);
});

// New API endpoint to fetch saved restaurants for a user
apiRouter.post('/getSavedRestaurants', mdbController.getSavedRestaurants, (req, res) => {
  res.status(200).json({message: 'Saved restaurants fetched', savedRestaurants: res.locals.savedRestaurants});
});

module.exports = apiRouter;
