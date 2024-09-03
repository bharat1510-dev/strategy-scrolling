import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function News(props) {
  const fetchMoreData =async ()=>{
    try {
      const nextPage = news.page + 1;
      const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-08-03&sortBy=publishedAt&apiKey=995289ebc4ef41dba6c5826f6d39afd6`;
      const response = await fetch(url);
      const parsedData = await response.json();
      console.log('total output is ',parsedData)
  
      setNews((prevNews) => ({
        page: nextPage,
        articles: [...prevNews.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
      }));
    } catch (error) {
      console.log('Error fetching more data:', error);
    }
  };
  const nextClickHandler = async ()=>{
    console.log(news.totalResults);
   let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-08-03&sortBy=publishedAt&apiKey=995289ebc4ef41dba6c5826f6d39afd6&page=${props.page+1}`
   let data= await fetch(url);
   let parsedata=await data.json();
  //  console.log(parsedata);
   setNews({
    page:props.page+1,
    articles:parsedata.articles
   })

  }
  const  prevClickHandler =async ()=>{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-08-03&sortBy=publishedAt&apiKey=995289ebc4ef41dba6c5826f6d39afd6&page=${props.page-1}`
   let data= await fetch(url);
   let parsedata=await data.json();
  //  console.log(parsedata);
   setNews({
    page:props.page-1,
    articles:parsedata.articles
   })


  }
  const [news, setNews] = useState(null);

  useEffect(() => {
    
    fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-08-03&sortBy=publishedAt&apiKey=995289ebc4ef41dba6c5826f6d39afd6&page=${props.page}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Print the fetched data
        
        setNews(data);
      })
      .catch(error => {
        console.log('Error fetching news:', error);
      });
  }, []);

  return (
    <div className='container my-3'>
      <p>Latest News</p>
      <InfiniteScroll
        dataLength={news ? news.articles.length : 0}
        next={fetchMoreData}
        hasMore={news && news.articles.length !== news.totalResults}
        loader={<h4>Loading...</h4>}
      >
        {news ? (
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
        ) : (
          <p></p>
        )}
      </InfiniteScroll>
      <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={prevClickHandler}>&larr; Prev</button>
        <button type="button" className="btn btn-dark" onClick={nextClickHandler}>Next &rarr;</button>
      </div>
    </div>
  );
  
}
