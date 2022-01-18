\c nc_news_test

SELECT * FROM topics;
SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM comments;

--SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 3 GROUP BY articles.article_id;