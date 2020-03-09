/**
 * @description 用户关注关系
 * @author qe
 */

const seq = require('../seq')
const {INTEGER} = require('../types')

const UserRelation = seq.define('user_relation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    idolId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户 ID'
    }
})

module.exports = UserRelation
