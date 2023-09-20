const axios = require('axios');
const express = require('express');
require('dotenv').config();

const restaurantController = {
  fetchRestaurants: async (req, res, next) => {
    console.log('hitting restaurantController');
    try {
      const { latitude, longitude } = req.query;
      const keyword = req.query.keyword || '';

      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        {
          params: {
            location: `${latitude},${longitude}`,
            radius: 2000, // Adjust as needed
            type: 'restaurant',
            keyword,
            opennow: true,
            key: process.env.GOOGLEAPI,
          },
        }
      );
      console.log('response :>> ', response);
      res.locals.restaurants = response.data.results.slice(0, 10); // Get top 10 results
      return next();
    } catch (error) {
      return next({
        log: 'Error in fetchRestaurants middleware',
        status: 500,
        message: { err: error.message },
      });
    }
  },
};

module.exports = restaurantController;
