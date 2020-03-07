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
        return null
    }

    // 找到了
    // 格式化
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * 创建用户
 * @param username 用户名
 * @param password 密码
 * @param gender 性别
 * @param nickname 昵称
 * @returns {Promise<void>}
 */
async function createUser({username, password, gender = 3, nickname}) {
    if (nickname == null) {
        nickname = username
    }
    const result = await User.create({
        username,
        password,
        gender,
        nickname
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param username 用户名
 * @returns {Promise<boolean>}
 */
async function removeUser(username) {
    const rows = await User.destroy({
        where: {
            username
        }
    })
    return rows > 0
}

/**
 * 更新用户信息
 * @param newPassword 新密码
 * @param newNickname 新昵称
 * @param newAvatar 新头像
 * @param newCity 新城市
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<void>}
 */
async function updateUser({newPassword, newNickname, newAvatar, newCity}, {username, password}) {
    // 更新的内容
    const updateData = {}
    if (newPassword)
        updateData.password = newPassword
    if (newNickname)
        updateData.nickname = newNickname
    if (newAvatar)
        updateData.avatar = newAvatar
    if (newCity)
        updateData.city = newCity

    // where 条件
    const where = {
        username
    }
    if (password)
        where.password = password
    const result = await User.update(updateData, {
        where
    })
    return result[0] > 0
}


module.exports = {
    getUserInfo,
    createUser,
    removeUser,
    updateUser
}
