/**
 * @description sequelize 实例
 * @author qe
 */

const Sequelize = require('sequelize')
const {host, port, username, password, database} = require('../config/db').MYSQL_CONFIG
const env = require('../utils/env')

const options = {
    host,
    port,
    dialect: 'mysql'
}

// 线上环境配置连接池
if (env.production) {
    options.pool = {
        max: 5,
        min: 0,
        idle: 10000 // 闲置时间
    }
}

// 测试环境关闭日志
if (env.test) {
    options.logging = false
}

const config = [database, username, password, options]
const seq = new Sequelize(...config)
module.exports = seq
