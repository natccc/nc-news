import axios from "axios";

const myApi = axios.create({
  baseURL: "https://be-news-api-h65m.onrender.com/api",
});

const getArticles = () => {
  return myApi.get(`/articles?p=1&limit=5`).then((res) => {
    return res.data.articles;
  });
};

const fetchArticles = (page) => {
  return myApi.get(`/articles?p=${page}&limit=5`).then((res) => {
    return res.data.articles;
  });
};
const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

const getComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

const patchArticle = (article_id, vote) => {
  return myApi.patch(`/articles/${article_id}`).send({ inc_votes: `${vote}`}).
    then((res) => {
    return res.data.article;
  });
};
export { getArticles, fetchArticles, getArticle, getComments, patchArticle };