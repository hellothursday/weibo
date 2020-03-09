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

module.exports = {
    getFollowersByIdol
}
