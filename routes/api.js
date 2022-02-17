const { validate } = require('validate.js');
const StationController = require('../controllers/StationController');
const router = require('express').Router();

router.get('/stations', async (req, res, next) => {
  const validated = validate(req.query, {
    at: { presence: true },
  });

  if (validated !== undefined) {
    res.status(400).json(validated).end();
    return;
  }

  try {
    const data = await StationController.find(req);
    res.status(200).json(data).end();
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json(error.message)
      .end();
  }
});

router.get('/stations/:id/', async (req, res) => {
  try {
    const data = await StationController.findOne(req);

    res.status(200).json(data).end();
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message)
      .end();
  }
});

module.exports = router;
