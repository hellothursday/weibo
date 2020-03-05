/**
 * @description user model test
 * @author qe
 */

const {User} = require('../../src/db/models')

test('User 模型的各个属性符合预期', () => {
    // build 会构建一个 User 实例，但不会提交到数据库
    const user = User.build({
        username: 'zhangsan',
        password: '123',
        nickname: '张三',
        // gender:1
        avatar: 'xxx.png',
        city: '北京'
    })
    // 验证各个属性
    expect(user.username).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickname).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.avatar).toBe('xxx.png')
    expect(user.city).toBe('北京')
})
