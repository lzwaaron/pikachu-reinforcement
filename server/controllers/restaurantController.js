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
      // Shuffle the array
      const shuffledRestaurants = response.data.results.sort(
        () => 0.5 - Math.random()
      );

      // Get up to 10 random restaurants
      const restaurants = shuffledRestaurants.slice(0, 10).map((restaurant) => {
        if (restaurant.photos && restaurant.photos[0]) {
          restaurant.photo_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLEAPI}`;
        }
        return restaurant;
      });

      res.locals.restaurants = restaurants; // Get top 10 results with photo URLs
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
