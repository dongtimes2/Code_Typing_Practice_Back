const { User } = require('../../models/User');

exports.get = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userData = await User.findOne({ _id: id }).lean();

    res.json(userData);
  } catch (err) {
    return next(err);
  }
};

exports.patch = async (req, res, next) => {
  const id = req.params.id;
  const { selectedLanguage, soundEffects } = req.body;

  try {
    const result = await User.findByIdAndUpdate(
      id,
      {
        selectedLanguage,
        soundEffects,
      },
      { new: true },
    );

    if (!result) {
      return next({ status: 401, message: 'Bad Request' });
    }
  } catch (err) {
    return next(err);
  }

  res.json('users_ok');
};

exports.recordGet = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.params.language);
  res.json('record_ok');
};
