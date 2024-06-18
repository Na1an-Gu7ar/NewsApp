import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/newsSlice';
import NewsItem from './NewsItem';

const SearchBar = ({ country, category, pageSize }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.news.articles);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        dispatch(fetchNews({ country, category, page: 1, pageSize, query: e.target.value }));
    };

    return (
        <div>
            <div className='row justify-content-center mb-5'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    style={{ border: '1px solid grey', boxShadow: '0px 0px 10px grey', padding: '10px 10px', top: '5rem' }}
                />
                {query && (
                    <ul className='d-flex'>
                        {articles.map((item) => (
                            <div className="col-md-4" key={item.url}>
                                <NewsItem
                                    title={item.title ? item.title.slice(0, 45) : ""}
                                    description={item.description ? item.description.slice(0, 88) : ""}
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url}
                                    author={item.author}
                                    date={item.publishedAt}
                                    source={item.source.name}
                                />
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
