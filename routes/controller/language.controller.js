const { Paragraph } = require('../../models/Paragraph');
const { Sentence } = require('../../models/Sentence');
const { Word } = require('../../models/Word');

exports.get = async (req, res, next) => {
  const typeOfLanguage = req.query.type;

  if (!['C', 'Python', 'JavaScript'].includes(req.params.language)) {
    return next({ status: 401, message: 'Bad Request' });
  }

  try {
    if (typeOfLanguage === 'word') {
      const words = await Word.find({}).lean();

      return res.json(words);
    } else if (typeOfLanguage === 'sentence') {
      const sentences = await Sentence.find({}).lean();

      return res.json(sentences);
    } else if (typeOfLanguage === 'paragraph') {
      const paragraphs = await Paragraph.find({}).lean();

      return res.json(paragraphs);
    } else {
      return next({ status: 401, message: 'Bad Request' });
    }
  } catch (err) {
    return next(err);
  }
};
