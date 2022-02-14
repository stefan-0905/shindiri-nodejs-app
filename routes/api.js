const { validate } = require('validate.js');
const StationController = require('../controllers/StationController');
const router = require('express').Router();

router.get('/stations', (req, res, next) => {
  const validated = validate(req.query, {
    at: { presence: true },
  });

  if (validated !== undefined) {
    res.status(400).json(validated).end();
    return;
  }

  StationController.find(req)
    .then((data) => {

      if (data.stations === undefined || data.stations.length === 0) {
        res.status(404).json([]).end();
        return;
      }

      res.status(200).json(data).end();
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message).end();
    });
});

router.get('/stations/:id/', (req, res) => {
  StationController.findOne(req)
    .then((data) => {
      if ((data === undefined) || (Array.isArray(data) && data.length === 0)) {
        res.status(404).json({ message: 'NOT FOUND'}).end();
        return;
      }
      
      res.status(200).json(data).end();
    })
    .catch((error) => {
      res.status(500).json(error.message).end();
    });
});

module.exports = router;
