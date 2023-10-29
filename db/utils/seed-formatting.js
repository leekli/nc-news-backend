exports.formatTopicsData = (topicsData) => {
  const formattedTopics = topicsData.map((topic) => [topic.description, topic.slug]);
  return formattedTopics;
};

exports.formatUsersData = (usersData) => {
  const formattedUsers = usersData.map((user) => [user.username, user.name, user.avatar_url]);
  return formattedUsers;
};

exports.formatArticlesData = (articlesData) => articlesData.map((article) => [
  article.title,
  article.topic,
  article.author,
  article.body,
  article.created_at,
  article.votes,
]);

exports.formatCommentsData = (commentsData) => commentsData.map((comment) => [
  comment.body,
  comment.votes,
  comment.author,
  comment.article_id,
  comment.created_at,
]);
