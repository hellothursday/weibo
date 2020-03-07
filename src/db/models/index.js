/**
 * @description 数据模型入口文件
 * @author qe
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

/*User.hasMany(Blog, {
    foreignKey: 'userId'
})*/

module.exports = {
    User,
    Blog
}
