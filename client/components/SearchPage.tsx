// client/components/SearchPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
// import '../css/styles.css';
import { Restaurant } from '../../models/restaurantModel';
import SavedRestaurant from './SavedRestaurant'; // import the SaveRestaurant component

const SearchPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [foodType, setFoodType] = useState<string>('');
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedRestaurants, setSavedRestaurants] = useState<Restaurant[]>([]); // Add a new state variable to hold the saved restaurants

  const fetchRestaurants = async () => {
    try {
      setLoading(true); // Set loading to true when the search is initiated
      // setSearchInitiated(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude);
        console.log(longitude);
        console.log('foodtype :>> ', foodType);
        const response = await axios.get('/api/restaurants', {
          params: { latitude, longitude, keyword: foodType },
        });
        console.log(response);
        setRestaurants(response.data);
        setLoading(false); // Set loading to false when the search is completed
        setSearchInitiated(true); // Set searchInitiated to true once the search is completed
      });
    } catch (error: any) {
      console.error('Error fetching restaurants', error);
      setLoading(false); // Set loading to false in case of an error
      // setSearchInitiated(true); // Set searchInitiated to true once the search is completed
    }
  };

  const handleGenerateRestaurants = () => {
    setSelectedRestaurant(null); // This line clears the selected restaurant
    setSearchInitiated(false); // Reset searchInitiated to false when the button is clicked
    fetchRestaurants();
  };

  const handleRandomSelect = () => {
    const randomRestaurant =
      restaurants[Math.floor(Math.random() * restaurants.length)];
    setSelectedRestaurant(randomRestaurant);
  };

  const handleSave = (restaurant: Restaurant) => {
    // Check if the restaurant is already in the saved list
    if (
      savedRestaurants.some(
        (savedRestaurant) => savedRestaurant.place_id === restaurant.place_id
      )
    ) {
      alert('This restaurant is already in your saved list.');
    } else {
      // Add the restaurant to the saved list
      setSavedRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        restaurant,
      ]);
    }
  };

  const handleDelete = (place_id: string) => {
    setSavedRestaurants((prev) =>
      prev.filter((restaurant) => restaurant.place_id !== place_id)
    );
  };

  return (
    <div className='searchPage flex flex-col items-center bg-gray-100 min-h-screen p-4'>
      <div className='flex space-x-4 mb-6'>
        <input
          type='text'
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          placeholder="What's for lunch?"
          className='p-2 border rounded-lg w-60 bg-gray-100'
        />
        <button
          onClick={handleGenerateRestaurants}
          className='bg-blue-500 text-white p-2 rounded-lg transition duration-300 hover:bg-blue-700'
        >
          Generate Restaurants
        </button>
        <button
          onClick={handleRandomSelect}
          className='bg-purple-500 text-white p-2 rounded-lg transition duration-300 hover:bg-purple-700'
        >
          Random Select
        </button>
      </div>
      {loading && <div className='spinner'></div>}{' '}
      {/* Display loading spinner when loading is true */}
      <div className='flex flex-col lg:flex-row w-full'>
        <ul className='grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-3 lg:w-2/3'>
          {searchInitiated && restaurants.length === 0 ? (
            <p>No luck! Try something different!</p>
          ) : (
            restaurants.map((restaurant) => (
              <li
                key={restaurant.place_id}
                className='bg-white p-4 rounded-lg shadow-lg'
              >
                <p className='font-bold text-lg mb-2'>{restaurant.name}</p>
                {/* <p>Type: {restaurant.types.join(', ')}</p> */}
                <p>
                  <strong>Rating:</strong> {restaurant.rating}
                </p>
                <p>
                  <strong>Price Level:</strong> {restaurant.price_level}
                </p>
                <p>
                  <strong>Address:</strong> {restaurant.vicinity}
                </p>
                {/* <img src="" alt="Restaurant Image" className="w-full h-40 object-cover rounded-lg mb-2"/> */}
                {/* <p>Distance: {restaurant.distance} meters</p> */}
                {restaurant.photos && restaurant.photos[0] && (
                  <img
                    src={restaurant.photo_url}
                    alt='Restaurant Image'
                    className='w-full h-40 object-cover rounded-lg mb-2'
                  />
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.name
                  )}+${encodeURIComponent(restaurant.vicinity)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 underline mt-2 inline-block'
                >
                  <img
                    src='https://img.icons8.com/color/48/000000/google-maps.png'
                    alt='Google Maps Icon'
                    className='inline-block mr-1 h-5 w-5'
                  />
                  View on Google Maps
                </a>
                <div className='flex justify-center items-center'>
                  <button
                    onClick={() => handleSave(restaurant)}
                    className='bg-green-500 text-white mt-2 p-2 rounded-lg transition duration-300 hover:bg-green-700'
                  >
                    Save
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className='bg-opacity-70 bg-blue backdrop-blur-md p-4 rounded-lg shadow-lg mt-6 w-full lg:w-1/3 lg:ml-4 transition-transform transform hover:scale-105 max-h-70 overflow-y-auto'>
          {selectedRestaurant && (
            <div>
              <h2 className='font-bold text-xl mb-2 text-red-700 text-center'>
                Selected Restaurant
              </h2>
              <p className='font-bold text-2xl text-center text-blue-700'>
                🌟{selectedRestaurant.name}🌟
              </p>
              {/* <p className="text-xl">Type: {selectedRestaurant.types.join(', ')}</p> */}
              <p className='text-lg'>
                <strong>Rating:</strong> {selectedRestaurant.rating}
              </p>
              <p className='text-lg'>
                <strong>Price Level:</strong> {selectedRestaurant.price_level}
              </p>
              <p className='text-lg'>
                <strong>Address:</strong> {selectedRestaurant.vicinity}
              </p>
              {selectedRestaurant.photo_url && (
                <img
                  src={selectedRestaurant.photo_url}
                  alt='Restaurant Image'
                  className='w-full h-40 object-cover rounded-lg mb-2'
                />
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedRestaurant.name
                )}+${encodeURIComponent(selectedRestaurant.vicinity)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline mt-2 inline-block'
              >
                <img
                  src='https://img.icons8.com/color/48/000000/google-maps.png'
                  alt='Google Maps Icon'
                  className='inline-block mr-1 h-5 w-5'
                />
                View on Google Maps
              </a>
              <div className='flex justify-center items-center'>
                <button
                  onClick={() =>
                    selectedRestaurant && handleSave(selectedRestaurant)
                  }
                  className='bg-green-500 text-white mt-2 p-2 rounded-lg transition duration-300 hover:bg-green-700'
                >
                  Save
                </button>
              </div>

              {/* <p className="text-lg">Distance: {selectedRestaurant.distance} meters</p> */}
            </div>
          )}
          {/* Add the SavedRestaurant right below the Selected Restaurant section */}
          <div>
            <SavedRestaurant
              savedRestaurants={savedRestaurants}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
