import { NextFunction, Request, Response } from 'express';

import { SERVER_URL } from '../../config/env.js';
import { Language } from '../../models/Language.js';
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
      id: data.name.trim().toLowerCase(),
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
