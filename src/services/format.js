/**
 * @description 数据格式化
 * @author qe
 */

const {DEFAULT_AVATAR} = require('../config/constant')

/**
 * 用户默认头像
 * @param obj 用户对象
 * @returns {*}
 */
function formatUserAvatar(obj) {
    if (obj.avatar == null) {
        obj.avatar = DEFAULT_AVATAR
    }
    return obj
}

/**
 * 格式化用户信息
 * @param users 用户列表或单个用户信息
 */
function formatUser(users) {
    if (users == null) {
        return users
    }
    // 数组 用户列表
    if (users instanceof Array) {
        return users.map(formatUserAvatar)
    }

    // 单个用户对象
    return formatUserAvatar(users)
}

module.exports = {
    formatUser
}
