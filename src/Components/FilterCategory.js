import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from '../redux/newsSlice';

const FilterCategory = ({ categories, country, numResults }) => {
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(fetchNews({ country, category: selectedCategory, page: 1, numResults, query: '' }));
  };

  return (
    <div>
      <select
        style={{ border: '1px solid grey', boxShadow: '0px 0px 10px grey', padding: '10px 10px', top: '5rem' }}
        id="category"
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategory;
