exports.get = (req, res, next) => {
  res.json('users_ok');
};

exports.patch = (req, res, next) => {
  res.json('users_ok');
};

exports.recordGet = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.params.language);
  res.json('record_ok');
};
