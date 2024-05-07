import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArticles, fetchArticles } from "../lib/api";

const Home = () => {
  const [page, setPage] = useState(2);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => setArticles(data))
      .catch((err) => setError(err));
  }, []);

  const fetchData = async () => {
    const articlesFromServer = await fetchArticles(page);

    setArticles([...articles, ...articlesFromServer]);
    if (articlesFromServer.length === 0 || articlesFromServer.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length} 
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex articles-center justify-center">
            <Loader className="text-gray-700"/>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
          <ul className="md:space-y-3">
            {articles.map((article) => {
              return (
                <ArticleCard
                  article={article}
                  key={article.article_id}
                />
              );
            })}
          </ul>{" "}
          {error && (
            <Error
              message={error.response.data.message}
              code={error.response.status}
            />
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Home;
