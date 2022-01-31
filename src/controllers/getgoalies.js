const { saveGoalies, getNewConfirmations } = require('../services/goalies')
const { scrape } = require('../services/scrape')
const { sendUpdates } = require('../services/slack')

const getGoalies = async () => {
    let { goalies, date } = await scrape()
    let updates = await getNewConfirmations(goalies, date)
    if (updates !== undefined)
        sendUpdates(updates)
    await saveGoalies(goalies, date)
}

module.exports = {
    getGoalies
}