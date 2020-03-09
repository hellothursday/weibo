/**
 * @description 连接 redis 的方法 get set
 * @author qe
 */

const redis = require('redis')
const {port, host} = require('../config/db').REDIS_CONFIG

// 创建 redis 客户端
const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 * redis set
 * @param key 键
 * @param val 值
 * @param timeout 过期时间，单位为秒
 */
function set(key, val, timeout = 60*2) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param key 键
 */
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get
}
