const { User } = require('../../models/User');

exports.get = async (req, res, next) => {
  const { uid } = req.user;

  try {
    const userData = await User.findOne({ _id: uid }).lean();

    res.json(userData);
  } catch (err) {
    next(err);
  }
};

exports.patch = (req, res, next) => {
  res.json('users_ok');
};

exports.recordGet = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.params.language);
  res.json('record_ok');
};
