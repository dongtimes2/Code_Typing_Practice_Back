import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Language } from '../../models/Language.js';
import { Practice } from '../../models/Practice.js';
import { IPractice, PRACTICE_TYPE_LIST } from '../../types/practice.js';

export const getPracticeData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const language = req.params.language;
  const practiceType = String(req.query.type);
  const quantity = Number(req.query.quantity);

  try {
    const languageRegex = new RegExp(language, 'i');
    const existingData = await Language.find({ name: languageRegex }).lean();

    if (!existingData.length) {
      return next({ status: 400, message: 'Invalid Programming Language' });
    }
  } catch (error) {
    return next(error);
  }

  if (!PRACTICE_TYPE_LIST.includes(practiceType)) {
    return next({ status: 400, message: 'Invalid Practice Type' });
  }

  if (!quantity || quantity < 1) {
    return next({ status: 400, message: 'Invalid Quantity' });
  }

  try {
    const total = await Practice.countDocuments({
      type: practiceType,
      language: language,
    }).lean();

    if (quantity <= total) {
      const result = await Practice.aggregate([
        { $match: { type: practiceType, language: language } },
        { $sample: { size: quantity } },
      ]);
      res.json(result);
    } else {
      const additionalDataNeeded = quantity - total;
      const practiceData = await Practice.aggregate([
        { $match: { type: practiceType, language: language } },
      ]);
      const result = [...practiceData];

      for (let i = 0; i < additionalDataNeeded; i++) {
        const randomIndex = Math.floor(Math.random() * practiceData.length);
        result.push(practiceData[randomIndex]);
      }
      res.json(result);
    }
  } catch (error) {
    return next(error);
  }
};

export const postPracticeData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const language = req.params.language;
  const data: IPractice = req.body;

  if (!data.content) {
    return next({ status: 400, message: 'Missing Content' });
  }

  try {
    const languageRegex = new RegExp(language, 'i');
    const languageData = await Language.find({ name: languageRegex });

    if (!languageData.length) {
      return next({ status: 400, message: 'Invalid Programming Language' });
    }
  } catch (error) {
    return next(error);
  }

  if (!PRACTICE_TYPE_LIST.includes(data.type)) {
    return next({ status: 400, message: 'Invalid Practice Type' });
  }

  const practiceData = await Practice.find({
    type: data.type,
    language: language,
    content: data.content,
  });

  if (practiceData.length) {
    return next({ status: 400, message: 'Already exists' });
  }

  try {
    const practiceData = new Practice<IPractice>({
      id: uuidv4(),
      type: data.type,
      language: language,
      content: data.content,
    });

    await practiceData.save();
    res.status(201).json({ message: 'Data is successfully saved' });
  } catch (error) {
    return next(error);
  }
};
