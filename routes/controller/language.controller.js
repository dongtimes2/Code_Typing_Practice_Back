const { Paragraph } = require('../../models/Paragraph');
const { Sentence } = require('../../models/Sentence');
const { Word } = require('../../models/Word');
const LANGUAGE_LIST = require('../../utils/constants').LANGUAGE_LIST;

exports.get = async (req, res, next) => {
  const practiceType = req.query.type;

  if (!LANGUAGE_LIST.includes(req.params.language)) {
    return next({ status: 400, message: 'Bad Request' });
  }

  try {
    if (practiceType === 'word') {
      const words = await Word.find({}).lean();

      return res.json(words);
    } else if (practiceType === 'sentence') {
      const sentences = await Sentence.find({}).lean();

      return res.json(sentences);
    } else if (practiceType === 'paragraph') {
      const paragraphs = await Paragraph.find({}).lean();

      return res.json(paragraphs);
    } else {
      return next({ status: 400, message: 'Bad Request' });
    }
  } catch (err) {
    return next(err);
  }
};
