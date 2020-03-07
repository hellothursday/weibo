/**
 * @description 数据模型入口文件
 * @author qe
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', // 级联删除
    onUpdate: 'CASCADE' // 级联更新
})

/*User.hasMany(Blog, {
    foreignKey: 'userId'
})*/

module.exports = {
    User,
    Blog
}
