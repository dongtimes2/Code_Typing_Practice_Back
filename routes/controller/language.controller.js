const { Paragraph } = require('../../models/Paragraph');
const { Sentence } = require('../../models/Sentence');
const { Word } = require('../../models/Word');

exports.get = async (req, res, next) => {
  const typeOfLanguage = req.query.type;

  try {
    if (typeOfLanguage === 'word') {
      const words = await Word.find({}).lean();

      return res.json(words);
    }

    if (typeOfLanguage === 'sentence') {
      const sentences = await Sentence.find({}).lean();

      return res.json(sentences);
    }

    if (typeOfLanguage === 'paragraph') {
      const paragraphs = await Paragraph.find({}).lean();

      return res.json(paragraphs);
    }
  } catch (err) {
    next(err);
  }
};
