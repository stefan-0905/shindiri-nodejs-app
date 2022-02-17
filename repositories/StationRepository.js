const STATION = require('../models/Station');

/**
 *
 * @param { Date } date
 * @returns
 */
const findAllAfterDate = async (date) => {
  const data = await STATION.aggregate(
    [
      {
        $match: {
          created_at: { $gte: date },
        },
      },
      {
        $lookup: {
          from: 'weathers',
          localField: 'created_at',
          foreignField: 'created_at',
          as: 'weather',
        },
      },
      {
        $group: {
          _id: '$Feature',
          at: { $first: '$created_at' },
          stations: { $push: '$$ROOT' },
          weather: { $addToSet: '$weather' },
        },
      },
      {
        $project: {
          _id: 0,
          at: 1,
          stations: 1,
          weather: 1,
        },
      },
    ],
    { allowDiskUse: true },
  );
  console.log(data.weather);
  return data;
};

/**
 *
 * @param { Number } id
 * @param { Date } at
 * @returns { Promise<[]>}
 */
const findOneAtDate = async (id, at) => {
  const aggregateAlgo = [
    {
      $sort: {
        created_at: 1,
      },
    },
    {
      $match: {
        'properties.id': id,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'weathers',
        localField: 'created_at',
        foreignField: 'created_at',
        as: 'weather',
      },
    },
    {
      $project: {
        _id: 0,
        at: '$created_at',
        station: '$$ROOT',
        weather: { $first: '$$ROOT.weather' },
      },
    },
  ];

  if (at !== undefined) {
    aggregateAlgo[1]['$match']['created_at'] = { $gte: at };
  }

  const data = await STATION.aggregate(aggregateAlgo, { allowDiskUse: true });
  return data[0];
};

/**
 *
 * @param { Number } id
 * @param { Date } start
 * @param { Date } end
 * @returns { Promise<[]> }
 */
const findAllInRange = async (id, start, end) => {
  const aggregateAlgo = [
    {
      $match: {
        'properties.id': id,
        created_at: { $gt: start, $lt: end },
      },
    },
    {
      $sort: {
        created_at: 1,
      },
    },
    {
      $lookup: {
        from: 'weathers',
        localField: 'created_at',
        foreignField: 'created_at',
        as: 'weather',
      },
    },
    {
      $project: {
        _id: 0,
        at: '$created_at',
        station: '$$ROOT',
        weather: { $first: '$$ROOT.weather' },
      },
    },
  ];

  return await STATION.aggregate(aggregateAlgo, { allowDiskUse: true });
};

module.exports = {
  findAllAfterDate,
  findAllInRange,
  findOneAtDate,
};
