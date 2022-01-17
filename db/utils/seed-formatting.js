exports.formatTopicsData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.description,
    topic.slug,
  ]);
  return formattedTopics;
};

exports.formatUsersData = (userData) => {
  const formattedUsers = userData.map((user) => [
    user.username,
    user.name,
    user.avatar_url,
  ]);
  return formattedUsers;
};

exports.formatArticlesData = (articleData) => {
  return articleData.map((article) => {
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

exports.formatCommentsData = (commentData) => {
  return commentData.map((comment) => {
    return [
      comment.body,
      comment.votes,
      comment.author,
      comment.article_id,
      comment.created_at,
    ];
  });
};
