const { MongoClient } = require('mongodb')

const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL);

const saveGoalies = async (list, date) => {
    try {
        await client.connect();
        const database = client.db('goalies')
        const goalieslist = database.collection('goalieslist')
        
        const filter = { date: date }
        const options = { upsert: true }

        const updateDoc = {
            $set: {
                date: date,
                list: list
            }
        }
        const result = await goalieslist.updateOne(filter, updateDoc, options)
        console.log(`Modified document(s)`)

    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

const getNewConfirmations = async (list, date) => {
    try {
        await client.connect()
        const database = client.db('goalies')
        const goalieslist = database.collection('goalieslist')
        
        const query = { date: date }
        const result = await goalieslist.findOne(query)

        let list2 = (result === null) ? {} : result.list
        let updates = await conmpareLists(list, list2)
        console.log(updates)
        return updates
        
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

const conmpareLists = async (list1, list2) => {
    let updates = []

    Object.keys(list1).forEach(key => {
        if (list1[key] === "Confirmed") {
            if (list2[key] !== "Confirmed" )
                updates.push(key) 
        }
    })
    return updates
}

module.exports = {
    saveGoalies,
    getNewConfirmations
}