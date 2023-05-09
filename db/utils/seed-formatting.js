exports.formatTopicsData = (topicsData) => {
  const formattedTopics = topicsData.map((topic) => [
    topic.description,
    topic.slug,
  ]);
  return formattedTopics;
};

exports.formatUsersData = (usersData) => {
  const formattedUsers = usersData.map((user) => [
    user.username,
    user.name,
    user.avatar_url,
  ]);
  return formattedUsers;
};

exports.formatArticlesData = (articlesData) => {
  return articlesData.map((article) => {
    return [
      article.title,
      article.topic,
      article.author,
      article.body,
      article.created_at,
      article.votes,
    ];
  });
};

exports.formatCommentsData = (commentsData) => {
  return commentsData.map((comment) => {
    return [
      comment.body,
      comment.votes,
      comment.author,
      comment.article_id,
      comment.created_at,
    ];
  });
};
