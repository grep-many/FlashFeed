import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Ensure that the document title is updated only once
    useEffect(() => {
        document.title = `FlashFeed | ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
        fetchData();
    }, []); // Run only once when the component mounts

    const fetchData = async () => {
        props.setProgress(25);
        const key = process.env.REACT_APP_NEWS_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${key}&page=${page}&pageSize=${props.pageSize}`;

        try {
            const response = await fetch(url);
            const parsedData = await response.json();

            // Filter out duplicates and unwanted articles based on the URL
            const newArticles = parsedData.articles.filter((article) =>
                !articles.some((existingArticle) => existingArticle.url === article.url) &&
                article.source.name !== "[removed]" &&
                article.title !== "[removed]" &&
                article.description !== "[removed]" &&
                article.content !== "[removed]" &&
                article.url !== "https://removed.com"
            );

            // Calculate whether there are more articles to load
            const totalPages = Math.ceil(parsedData.totalResults / props.pageSize);
            setHasMore(page < totalPages);
            props.setProgress(50);

            // Ensure only unique articles are added to the list
            setArticles((prevArticles) => [
                ...prevArticles, 
                ...newArticles.filter((newArticle) => !prevArticles.some((existingArticle) => existingArticle.url === newArticle.url))
            ]);

            props.setProgress(100);
        } catch (error) {
            console.error("Failed to fetch news data:", error);
            props.setProgress(0); // Reset progress bar in case of failure
        }
    };

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1); // Increment the page for pagination
    };

    // Whenever page changes, fetch new data
    useEffect(() => {
        if (page > 1) {
            fetchData();
        }
    }, [page]);

    return (
        <div className="container my-3">
            <h1 className="text-center text-light my-5">
                <strong>FlashFeed</strong> - Top Headlines | {props.category.charAt(0).toUpperCase() + props.category.slice(1)}
            </h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-center text-light">Loading...</h4>}
                endMessage={
                    <p className="text-center text-light my-5">
                        <strong>You are all caught up for today!</strong>
                    </p>
                }
            >
                <div className="container row d-flex justify-content-center">
                    {articles.map((article) => (
                        <NewsItem
                            key={article.url}
                            title={article.title}
                            description={article.description}
                            imageUrl={article.urlToImage}
                            url={article.url}
                            published={article.publishedAt}
                            author={article.author}
                            source={article.source.name}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

// News.defaultProps = {
//     country: 'us',
//     pageSize: 15,
// };

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired, // Assuming this is passed as a prop
};

export default News;
