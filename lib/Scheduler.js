const cron = require('node-cron');

const Scheduler = Object.freeze({
  run: (interval, task) => {
    if(task === undefined || task === null) {
      throw new Error('Task is UNDEFINED|NULL')
    }

    return cron.schedule(interval, task)
  }
})

module.exports = Scheduler