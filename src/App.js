import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import SearchBar from './Components/SearchBar';
import FilterCategory from './Components/FilterCategory';

const App = (props) => {
  const [progress, setProgress] = useState(0);
  const [categories] = useState(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']);
  const selectedCategory = useSelector((state) => state.page.category);
  const newsData = useSelector((state) => state.news.articles);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <LoadingBar
        height={5}
        color='#f11946'
        progress={progress}
      />
      <div className='row justify-content-center'>
        <div className='px-3'>
          <SearchBar country={props.country} category={selectedCategory} numResults={props.numResults} />
        </div>
        <div className='px-3'>
          <FilterCategory categories={categories} country={props.country} numResults={props.numResults} />
        </div>
      </div>
      {/* {selectedCategory === '' ? "" : <News country={props.country} category={selectedCategory} numResults={props.numResults} setProgress={setProgress} />} */}
      <News setProgress={setProgress} country={props.country} numResults={props.numResults} category="" />
    </div>
  );
};

App.defaultProps = {
  country: 'in',
  numResults: 8,
};

export default App;
