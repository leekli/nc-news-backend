// Error handling

exports.handle404s = (req, res) => {
  res.status(404).send({ msg: 'Invalid URL' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlErrorList = ['22P02', '23502', '42703', '42P01', '23503', '23505'];
  if (psqlErrorList.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res) => {
  res.status(500).send({ msg: 'Internal server error' });
};
