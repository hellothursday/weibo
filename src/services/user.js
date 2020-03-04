/**
 * @description user service
 * @author qe
 */

const {User} = require('../db/models')
const {formatUser} = require('./format')

/**
 * 获取用户信息
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<void>} 用户信息
 */
async function getUserInfo(username, password) {
    // 查询条件
    const where = {
        username
    }
    if (password) {
        Object.assign(where, {password})
    }

    // 查询的列
    const attributes = ['id', 'username', 'nickname', 'avatar', 'city']

    const result = await User.findOne({
        attributes,
        where
    })

    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

module.exports = {
    getUserInfo
}
