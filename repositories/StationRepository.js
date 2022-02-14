const STATION = require('../models/Station');

const StationRepository = Object.freeze({
  /**
   *
   * @param { Date } date
   * @returns
   */
  findAllAfterDate: (date) => {
    return new Promise((resolve, reject) => {
      STATION.aggregate(
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
        { allowDiskUse: true }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   *
   * @param { Number } id
   * @param { Date } at
   * @returns { Promise<[]>}
   */
  findOneAtDate: (id, at) => {
    return new Promise((resolve, reject) => {
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

      STATION.aggregate(aggregateAlgo, { allowDiskUse: true })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   *
   * @param { Number } id
   * @param { Date } start
   * @param { Date } end
   * @returns { Promise<[]> }
   */
  findAllInRange: (id, start, end) => {
    return new Promise((resolve, reject) => {
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

      STATION.aggregate(aggregateAlgo, { allowDiskUse: true })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
});

module.exports = StationRepository;
