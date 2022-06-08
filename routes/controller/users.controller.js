const { User } = require('../../models/User');
const LANGUAGE_LIST = require('../../utils/constants').LANGUAGE_LIST;

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

  if (!LANGUAGE_LIST.includes(selectedLanguage)) {
    return next({ status: 400, message: 'Invalid Programming Language' });
  }

  if (typeof soundEffects !== 'boolean') {
    return next({ status: 400, message: 'Not boolean type' });
  }

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
      return next({ status: 400, message: 'Bad Request' });
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
