import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/newsSlice';
import { incrementPage, decrementPage, setProgress, resetProgress } from '../redux/pagination';
import NewsItem from './NewsItem';

const News = ({ country, pageSize, category }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  const totalResults = useSelector((state) => state.news.totalResults);
  const status = useSelector((state) => state.news.status);
  const page = useSelector((state) => state.page.page);

  useEffect(() => {
    document.title = "NewsApp";
    dispatch(setProgress(10));
    dispatch(fetchNews({ country, category, page, pageSize }))
      .then(() => dispatch(setProgress(100)))
      .finally(() => dispatch(resetProgress()));
  }, [dispatch, country, category, page, pageSize]);

  const handlePrevClick = () => {
    dispatch(decrementPage());
    setProgress(50);
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      dispatch(incrementPage());
      setProgress(50);
    }
  };

  if (status === 'loading') {
    setProgress(50);
  }

  if (status === 'failed') {
    setProgress(20)
  }

  return (
    <>
      <h1 className='text-center'>Top Headlines</h1>
      <div className='container' style={{ overflow: 'hidden' }}>
        <div className="row my-3">
          {Array.isArray(articles) && articles.length > 0 ? ( articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={`${element.title ? element.title.slice(0, 45) : ""}...`}
                description={`${element.description ? element.description.slice(0, 88) : ""}...`}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))
        ) : (
          <p className='text-center'>No articles available</p>
        )}
        </div>
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} type="button" className="btn btn-danger" onClick={handlePrevClick}>&larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults / pageSize)} type="button" className="btn btn-warning" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </>
  );
};

export default News;
