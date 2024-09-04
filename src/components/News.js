import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {
  // Base news articles
  const baseArticles = [
    {
      title: "Tesla's New Model X Released",
      description: "Tesla has released a new version of the Model X with enhanced features.",
      urlToImage: "https://example.com/image1.jpg",
      url: "https://example.com/news1",
    },
    {
      title: "Elon Musk Announces New Space Mission",
      description: "SpaceX is planning a new mission to Mars, Elon Musk announced.",
      urlToImage: "https://example.com/image2.jpg",
      url: "https://example.com/news2",
    },
    // Add more base articles if needed
  ];

  // Function to generate thousands of articles
  const generateArticles = (count) => {
    let articles = [];
    for (let i = 0; i < count; i++) {
      baseArticles.forEach((article, index) => {
        articles.push({
          title: `${article.title} - ${i + 1}`,
          description: `${article.description} (Article ${i + 1})`,
          urlToImage: article.urlToImage,
          url: `${article.url}?id=${i + 1}`,
        });
      });
    }
    return articles;
  };

  // Generate 1000 articles
  const allArticles = generateArticles(500); // Adjust the number as needed

  const [news, setNews] = useState({
    page: 1,
    articles: allArticles.slice(0, 20), // Initially load the first 20 articles
    totalResults: allArticles.length,
  });
  const [loading, setLoading] = useState(false);

  const fetchMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      const newPage = news.page + 1;
      const newArticles = allArticles.slice(news.articles.length, news.articles.length + 20);
      setNews((prevNews) => ({
        page: newPage,
        articles: [...prevNews.articles, ...newArticles],
        totalResults: prevNews.totalResults,
      }));
      setLoading(false);
    }, 100); // 2 seconds delay
  };

  useEffect(() => {
    // No need to call setNews here as we already set the initial state above
  }, []);

  return (
    <div className="container my-3">
      <p>Latest News</p>
      <InfiniteScroll
        dataLength={news.articles.length}
        next={fetchMoreData}
        hasMore={news.articles.length < news.totalResults}
       
      >
        <div className="row">
          {news.articles.map((article, index) => (
            <div className="col-md-3 mb-4" key={index}>
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
      {loading && (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      )}
    </div>
  );
}

