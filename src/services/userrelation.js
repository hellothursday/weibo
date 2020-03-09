/**
 * @description 用户关系 service
 * @author qe
 */

const {User, UserRelation} = require('../db/models')
const {formatUser} = require('./format')

/**
 * 获取粉丝列表
 * @param idolId 用户 ID
 * @returns {Promise<void>}
 */
async function getFollowersByIdol(idolId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'username', 'nickname', 'avatar'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    idolId
                }
            }
        ]
    })

    // result.count 总数
    // result.rows 查询结果，数组

    let followerList = result.rows.map(row => row.dataValues)
    followerList = formatUser(followerList)
    const count = result.count
    return {
        count,
        followerList
    }
}

/**
 * 添加关注关系
 * @param userId 用户 ID
 * @param idolId 被关注者的 ID
 * @returns {Promise<void>}
 */
async function addFollow(userId, idolId) {
    const result = await UserRelation.create({
        userId,
        idolId
    })
    return result.dataValues
}


/**
 * 删除关注关系
 * @param userId 用户 ID
 * @param idolId 被关注者的 ID
 * @returns {Promise<void>}
 */
async function removeFollow(userId, idolId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            idolId
        }
    })
    return result > 0
}

module.exports = {
    getFollowersByIdol,
    addFollow,
    removeFollow
}
