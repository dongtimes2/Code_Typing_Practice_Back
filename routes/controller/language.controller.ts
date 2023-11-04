import { NextFunction, Request, Response } from 'express';

import { LANGUAGE_LIST } from '../../constants/language.js';
import { PRACTICE_TYPE_LIST } from '../../constants/practiceType.js';
import { Paragraph } from '../../models/Paragraph.js';
import { Sentence } from '../../models/Sentence.js';
import { Word } from '../../models/Word.js';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const practiceType = req.query.type as string;
  const language = req.params.language;

  if (!LANGUAGE_LIST.includes(language)) {
    return next({ status: 400, message: 'Invalid Programming Language' });
  }

  if (!PRACTICE_TYPE_LIST.includes(practiceType)) {
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
