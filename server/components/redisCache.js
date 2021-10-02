

const Redis = require("redis")
const config = require('../config/index')
const redisClient = Redis.createClient({
  host:config.redis.socket.host,
  port:config.redis.socket.port
})

module.exports.getOrSetCache = async (key, cb) => {

    
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