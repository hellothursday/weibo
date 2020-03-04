/**
 * @description 数据库同步
 * @author qe
 *
 */


const {ConnectionError, DatabaseError} = require('sequelize')

const seq = require('./seq')
// require('./model')

!(async () => {
    try {
        await seq.authenticate()
        console.log('连接成功')
        await seq.sync({force: true})
        process.exit()
    } catch (e) {
        if (e instanceof ConnectionError) {
            console.error('连接失败', e)
        } else if (e instanceof DatabaseError) {
            console.error('数据库错误', e)
        } else {
            console.error('发送错误', e)
        }
    }
})()
