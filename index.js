const express = require('express')
const { getGoalies } = require('./src/controllers/getgoalies')
var CronJob = require('cron').CronJob;

const PORT = 8080
const app = express()

app.listen(PORT, () => {console.log('App started on port ' + PORT)})

var job = new CronJob('*/5 * * * *', function() {
  console.log('Job started');
  getGoalies()
}, null, true, 'America/New_York');


job.start();