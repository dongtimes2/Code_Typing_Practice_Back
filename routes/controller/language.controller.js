const Paragraph = require('../../models/Paragraph');
const Sentence = require('../../models/Sentence');
const Word = require('../../models/Word');
const LANGUAGE_LIST = require('../../utils/constants').LANGUAGE_LIST;
const PRACTICE_TYPE = require('../../utils/constants').PRACTICE_TYPE;

exports.get = async (req, res, next) => {
  const practiceType = req.query.type;
  const language = req.params.language;

  if (!LANGUAGE_LIST.includes(language)) {
    return next({ status: 400, message: 'Invalid Programming Language' });
  }

  if (!PRACTICE_TYPE.includes(practiceType)) {
    return next({ status: 400, message: 'Invalid practice type' });
  }

  try {
    if (practiceType === 'word') {
      const words = await Word.find({
        language,
      }).lean();

      return res.json(words);
    } else if (practiceType === 'sentence') {
      const sentences = await Sentence.find({
        language,
      }).lean();

      return res.json(sentences);
    } else if (practiceType === 'paragraph') {
      const paragraphs = await Paragraph.find({
        language,
      }).lean();

      return res.json(paragraphs);
    }
  } catch (err) {
    return next(err);
  }
};
