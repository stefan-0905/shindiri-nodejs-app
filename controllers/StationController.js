const { filterForOnlyDaily } = require('../lib/Helpers');
const StationRepository = require('../repositories/StationRepository');

/**
 *
 * @param { import('express').Request } res
 * @returns { Promise<[]> } data from db
 */
const find = async (req) => {
  const date = new Date(req.query.at);

  try {
    if (isNaN(date)) {
      reject(new Error('Not valid date'));
    }

    const data = await StationRepository.findAllAfterDate(date);

    if (data.length === 0 || data[0].stations === undefined) {
      const error = new Error('NOT FOUND');
      error.status = 404;
      throw error;
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param { import('express').Request } res
 * @returns { Promise<[]> } data from db
 */
const findOne = async (req) => {
  const id = Number(req.params.id);
  let data;

  try {
    // Handling at query param
    if (req.query.at) {
      const from = new Date(req.query.at);
      if (isNaN(from)) {
        reject(new Error('Not valid date'));
      }

      data = await StationRepository.findOneAtDate(id, from);
    }
    // Handling from and to query param
    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);

      if (isNaN(from) || isNaN(to)) {
        reject(new Error('Not valid date'));
      }

      data = await StationRepository.findAllInRange(id, from, to);
      if (req.query.frequency && req.query.frequency === 'daily') {
        data = filterForOnlyDaily(data);
      }
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      const error = new Error('NOT FOUND');
      error.status = 404;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  find,
  findOne,
};
