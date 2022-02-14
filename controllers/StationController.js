const { filterForOnlyDaily } = require('../lib/Helpers');
const StationRepository = require('../repositories/StationRepository');

const StationController = Object.freeze({
  /**
   *
   * @param { import('express').Request } res
   * @returns { Promise<[]> } data from db
   */
  find: (req) => {
    return new Promise((resolve, reject) => {
      const date = new Date(req.query.at);

      if (isNaN(date)) {
        reject(new Error('Not valid date'));
      }

      StationRepository.findAllAfterDate(date)
        .then((data) => {
          resolve({ ...data[0] });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   *
   * @param { import('express').Request } res
   * @returns { Promise<[]> } data from db
   */
  findOne: (req) => {
    return new Promise((resolve, reject) => {
      const id = Number(req.params.id);

      let promise;

      if (req.query.at) {
        const from = new Date(req.query.at);
        if (isNaN(from)) {
          reject(new Error('Not valid date'));
        }

        promise = StationRepository.findOneAtDate(id, from);
      }
      if (req.query.from && req.query.to) {
        const from = new Date(req.query.from);
        const to = new Date(req.query.to);

        if (isNaN(from) || isNaN(to)) {
          reject(new Error('Not valid date'));
        }

        promise = StationRepository.findAllInRange(id, from, to).then((data) => {
          if (req.query.frequency !== undefined && req.query.frequency === 'daily') {
            return filterForOnlyDaily(data);
          }

          return data;
        });
      }

      if (promise === undefined) {
        resolve(undefined);
        return;
      }

      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
});

module.exports = StationController;
