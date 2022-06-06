const { User } = require('../../models/User');

exports.get = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userData = await User.findOne({ _id: id }).lean();
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

exports.patch = async (req, res, next) => {
  const { id, selectedLanguage, soundEffects } = req.body;

  await User.findByIdAndUpdate(
    id,
    {
      selectedLanguage,
      soundEffects,
    },
    { new: true },
  );

  res.json('users_ok');
};

exports.recordGet = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.params.language);
  res.json('record_ok');
};
