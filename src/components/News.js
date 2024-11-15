import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 15,
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            totalResults: 0,
            page: 1,
            hasMore: true, // Initially set to true
        };
        document.title = `FlashFeed | ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
    }

    // Fetching data with pagination and filtering duplicates
    async fetchData() {
        this.props.setProgress(25);
        const key = process.env.REACT_APP_NEWS_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        try {
            const data = await fetch(url);
            const parsedData = await data.json();
            
            // Filter out duplicates and unwanted articles
            const newArticles = parsedData.articles.filter(
                (article) =>
                    !this.state.articles.some((existingArticle) => existingArticle.url === article.url) &&
                article.source.name !== "[removed]" &&
                article.title !== "[removed]" &&
                article.description !== "[removed]" &&
                article.content !== "[removed]" &&
                article.url !== "https://removed.com"
            );
            
            // Calculate whether there are more articles to load
            const totalPages = Math.ceil(parsedData.totalResults / this.props.pageSize);
            const hasMore = this.state.page < totalPages;
            this.props.setProgress(50);

            this.setState((prevState) => ({
                articles: [...prevState.articles, ...newArticles],
                totalResults: parsedData.totalResults,
                hasMore, // Update hasMore based on the total results
            }));
            this.props.setProgress(100);
        } catch (error) {
            console.error("Failed to fetch news data:", error);
        }
    }

    // Handle component mount and fetch initial data
    async componentDidMount() {
        this.fetchData();
    }

    // Load more data when the user scrolls to the bottom
    fetchMoreData = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
            this.fetchData();
        });
    };

    render() {
        const { articles, hasMore } = this.state;

        return (
            <div className="container my-3">
                <h1 className="text-center text-light my-5">
                    <strong>FlashFeed</strong> - Top Headlines | {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
                </h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchMoreData}
                    hasMore={hasMore}
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
    }
}

export default News;
