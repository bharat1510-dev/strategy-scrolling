import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {
  const [news, setNews] = useState({
    page: props.page || 1,
    articles: [],
    totalResults: 0,
  });

  const fetchNews = async (page = 1) => {
    try {
      const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-08-03&sortBy=publishedAt&apiKey=995289ebc4ef41dba6c5826f6d39afd6&page=${page}`;
      const response = await fetch(url);
      const parsedData = await response.json();

      setNews((prevNews) => ({
        page: page,
        articles: page === 1 ? parsedData.articles : [...prevNews.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
      }));
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews(news.page);
  }, [news.page]);

  const fetchMoreData = () => {
    fetchNews(news.page + 1);
  };

  const nextClickHandler = () => {
    fetchNews(news.page + 1);
  };

  const prevClickHandler = () => {
    if (news.page > 1) {
      fetchNews(news.page - 1);
    }
  };

  return (
    <div className='container my-3'>
      <h2>Latest News</h2>
      {news.articles.length === 0 && <h4>No news available</h4>}
      <InfiniteScroll
        dataLength={news.articles.length}
        next={fetchMoreData}
        hasMore={news.articles.length < news.totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {news.articles.map((article, index) => (
            <div className="col md-3" key={index}>
              <Newsitem
                title={article.title}
                description={article.description}
                image={article.urlToImage}
                newsurl={article.url}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={prevClickHandler} disabled={news.page === 1}>
          &larr; Prev
        </button>
        <button type="button" className="btn btn-dark" onClick={nextClickHandler}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
