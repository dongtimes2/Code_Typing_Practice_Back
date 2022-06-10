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
  const { selectedLanguage, soundEffects, numberProblems } = req.body;

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
        numberProblems,
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

exports.recordGet = async (req, res, next) => {
  const id = req.params.id;
  const language = req.params.language;

  try {
    const userInfomation = await User.findById(id).lean();

    if (!userInfomation) {
      return next({ status: 400, message: 'Bad Request' });
    }

    const totalRecords = userInfomation.languageRecord;
    const result = [];

    for (const record of totalRecords) {
      if (record.language === language) {
        const data = {
          typingSpeed: record.typingSpeed,
          accuracy: record.accuracy,
          time: record.time,
        };

        result.push(data);
      }
    }

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

exports.recordPatch = async (req, res, next) => {
  const id = req.params.id;
  const language = req.params.language;
  const { typingSpeed, accuracy, time } = req.body;

  if (!LANGUAGE_LIST.includes(language)) {
    return next({ status: 400, message: 'Invalid Programming Language' });
  }

  if (typeof typingSpeed !== 'number') {
    return next({ status: 400, message: 'typingSpeed is not a number type' });
  }

  if (typeof accuracy !== 'number') {
    return next({ status: 400, message: 'accuracy is not a number type' });
  }

  try {
    const result = await User.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          languageRecord: {
            language,
            typingSpeed,
            accuracy,
            time,
          },
        },
      },
      { new: true },
    );

    if (!result) {
      return next({ status: 400, message: 'Bad Request' });
    }
  } catch (err) {
    return next(err);
  }
  res.json('record_patch_ok');
};
