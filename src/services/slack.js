const { IncomingWebhook } = require('@slack/webhook')
const url = process.env.SLACK_WEBHOOK_URL

const webhook = new IncomingWebhook(url)

const sendUpdates = (updates) => {
    updates.forEach(goalie => {
        console.log('Sending ' + goalie)
        webhook.send({
            text: `:white_check_mark: ${goalie} Confirmed`
        })
    })
}

module.exports = {
    sendUpdates
}