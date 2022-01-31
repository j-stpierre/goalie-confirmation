const axios = require('axios')
const cheerio = require('cheerio')

const SCRAPE_URL = process.env.SCRAPE_URL


const scrape = async () => {
    let goalies = {}
    let date = ''
    await axios.get(SCRAPE_URL)
        .then((response) => {
            const $ = cheerio.load(response.data)

            date = $('.maincontent h1').text().replace(/NHL Starting Goalies: /gm,"")
            $('.goalie-info-details-flex').each(function (i, e) {
                const $2 = cheerio.load($(this).html())
                goalies[$2('h4').text()] = $2('h5').text().replace(/(\r\n|\n|\r|\s)*/gm, "")
            })
    })
    return { goalies, date }
}

module.exports = {
    scrape
}