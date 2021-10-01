

const Redis = require("redis")


module.exports.getOrSetCache = async (key, cb) => {

    const redisClient = Redis.createClient()
    const DEFALT_EXPIRATION = 360000

    return new Promise((resolve, reject) =>{
      redisClient.get(key, async (error, data) =>{
        if(error) return reject(error)

        if(data!= null) return resolve(JSON.parse(data))
        const freshData = await cb()

        redisClient.setex(key, DEFALT_EXPIRATION, JSON.stringify(freshData))
        resolve(freshData)

      })
    })
  
}