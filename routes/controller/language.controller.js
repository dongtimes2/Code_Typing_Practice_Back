exports.get = (req, res, next) => {
  res.json(`${req.query.type}_ok`);
};
