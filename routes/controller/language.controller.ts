import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { SERVER_URL } from '../../config/env.js';
import { LANGUAGE_LIST } from '../../constants/language.js';
import { PRACTICE_TYPE_LIST } from '../../constants/practiceType.js';
import { Language } from '../../models/Language.js';
import { Paragraph } from '../../models/Paragraph.js';
import { Sentence } from '../../models/Sentence.js';
import { Word } from '../../models/Word.js';
import { ILanguage } from '../../types/language.js';

export const getLanguagesList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: ILanguage[] = await Language.find().lean();
    res.json(data);
  } catch (error) {
    return next(error);
  }
};

export const postLanguageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data: ILanguage = req.body;

  if (!data.name) {
    return next({ status: 400, message: 'Missing Name' });
  } else if (!data.description) {
    return next({ status: 400, message: 'Missing Description' });
  }

  try {
    const existingData = await Language.find({ name: data.name });

    if (existingData.length) {
      return next({ status: 400, message: 'Already exists' });
    }
  } catch (error) {
    return next(error);
  }

  try {
    const languageData = new Language<ILanguage>({
      id: uuidv4(),
      name: data.name,
      description: data.description,
      imagePath: `${SERVER_URL}/svgs/${data.name}.svg`,
    });

    await languageData.save();
    res.status(201).json({ message: 'Data is successfully saved' });
  } catch (error) {
    return next(error);
  }
};

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
