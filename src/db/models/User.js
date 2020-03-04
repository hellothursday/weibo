/**
 * @description 用户数据模型
 * @author qe
 */

const seq = require('../seq')
const {STRING, TINYINT} = require('../types')

// users 表
const User = seq.define('user', {
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickname: {
        type: STRING,
        allowNull: true,
        comment: '昵称'
    },
    gender: {
        type: TINYINT,
        defaultValue: 3,
        allowNull: false,
        comment: '性别 (1 男，2 女，3 保密)'
    },
    avatar: {
        type: STRING,
        allowNull: true,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        allowNull: true,
        comment: '城市'
    }
})

module.exports = User
