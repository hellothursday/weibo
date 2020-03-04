/**
 * @description 存储设置
 * @author qe
 */

const env = require('../utils/env')

let REDIS_CONFIG = {
    port: 6379,
    host: 'localhost'
}

let MYSQL_CONFIG = {
    host: 'localhost',
    username: 'root',
    password: '123',
    port: 8889,
    database: 'weibo'
}

if (env.production) {
    REDIS_CONFIG = {
        // 线上的 redis 配置
        port: 6379,
        host: 'localhost'
    }
    MYSQL_CONFIG = {
        // 线上的 mysql 配置
        host: 'localhost',
        username: 'root',
        password: '123',
        port: 8889,
        database: 'weibo'
    }
}

module.exports = {
    REDIS_CONFIG,
    MYSQL_CONFIG
}
