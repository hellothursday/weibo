/**
 * @description 数据库同步
 * @author qe
 *
 */


const {ConnectionError, DatabaseError} = require('sequelize')

const seq = require('./seq')
require('./models')

async function sync() {
    try {
        console.log('测试连接', await seq.authenticate())
        console.log('连接成功')
        console.log('测试同步', await seq.sync({force: true}))
        console.log('同步成功')
        process.exit()
    } catch (e) {
        if (e instanceof ConnectionError) {
            console.error('连接失败', e)
        } else if (e instanceof DatabaseError) {
            console.error('数据库错误', e)
        } else {
            console.error('发生错误', e)
        }
    }
}

module.exports = sync
