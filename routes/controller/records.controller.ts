import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Language } from '../../models/Language.js';
import { Record } from '../../models/Record.js';
import { PRACTICE_TYPE_LIST } from '../../types/practice.js';
import { IRecord, RECORD_TYPE_LIST } from '../../types/record.js';

export const getRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.userId;
  const type = req.query.type as string;

  if (!RECORD_TYPE_LIST.includes(type)) {
    return next({ status: 400, message: 'Invalid Record Type' });
  }

  // 평균 정확도와 타자 속도를 반환한다.
  // 정확도의 경우 낱말 및 문장 연습 모두를 포함하여 계산하며, 타자 속도의 경우 문장 연습 데이터만 계산한다.
  if (type === 'stat') {
    const result = await Record.aggregate([
      { $match: { userId: id } },
      {
        $group: {
          _id: null,
          accuracy: { $avg: '$accuracy' },
          typingSpeed: {
            $avg: {
              $cond: {
                if: { $eq: ['$type', 'sentence'] },
                then: '$typingSpeed',
                else: null,
              },
            },
          },
        },
      },
    ]);
    res.json(result);
  }

  // 최근 20개의 기록을 가져온다
  if (type === 'recent') {
    try {
      const data = await Record.find({ userId: id })
        .sort({ _id: -1 })
        .limit(20)
        .lean();
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }
};

export const postRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.userId;
  const data: IRecord = req.body;

  if (!PRACTICE_TYPE_LIST.includes(data.type)) {
    return next({ status: 400, message: 'Invalid Practice Type' });
  }

  const languageData = await Language.find({ id: data.language });
  if (!languageData.length) {
    return next({ status: 400, message: 'Invalid Programming Language' });
  }

  try {
    const recordData = new Record<IRecord>({
      id: uuidv4(),
      userId: id,
      type: data.type,
      language: data.language,
      accuracy: data.accuracy,
      typingSpeed: data.typingSpeed ?? 0,
    });

    await recordData.save();
    res.status(201).json({ message: 'Data is successfully saved' });
  } catch (error) {
    return next(error);
  }
};
