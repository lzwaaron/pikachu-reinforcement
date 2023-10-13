import React from 'react';
import { Restaurant } from '../../models/restaurantModel';

interface SavedRestaurantProps {
  savedRestaurants: Restaurant[];
  handleDelete: (place_id: string) => void;
}

const SavedRestaurant: React.FC<SavedRestaurantProps> = ({
  savedRestaurants,
  handleDelete,
}) => {
  return (
    <div>
      <h2 className='font-bold text-xl mb-2 text-red-700 text-center mt-8'>
        Saved Restaurants
      </h2>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>  
            <th className='py-2 text-center'>Name</th>
            <th className='py-2 text-center'>Address</th>
            <th className='py-2 text-center'>Google Map Link</th>
            <th className='py-2 text-center'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {savedRestaurants.map((restaurant) => (
            <tr key={restaurant.place_id}>
              <td className='py-2 text-center font-bold'>{restaurant.name}</td>
              <td className='py-2 text-center'>{restaurant.vicinity}</td>
              <td className='py-2 text-center'>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.name
                  )}+${encodeURIComponent(restaurant.vicinity)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 underline mt-2 inline-block'
                >
                  📍
                </a>
              </td>
              <td className='py-2 text-center'>
                <button
                  className='bg-purple-500 text-white p-2 rounded-lg transition duration-300 hover:bg-purple-700'
                  onClick={() => handleDelete(restaurant.place_id)}
                >
                  Delete
                </button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedRestaurant;
