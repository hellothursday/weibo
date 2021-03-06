/**
 * @description user model test
 * @author qe
 */

const server = require('../server')

const username = `u_${Date.now()}`
const password = `p_${Date.now()}`
const nickname = username
const gender = 1

const user = {
    username,
    password,
    nickname,
    gender
}

// 存储 cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
    const res = await server.post('/api/user/register')
        .send(user)
    expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册，应该失败', async () => {
    const res = await server.post('/api/user/register')
        .send(user)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户是否存在', async () => {
    const res = await server.post('/api/user/exist')
        .send({username})
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式应该失败', async () => {
    const res = await server.post('/api/user/register')
        .send({
            username: '123', // 用户名不是字母(或下划线)开头
            password: 'a',
            // gender: '',
            gender: 'female'
        })
    expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录，应该成功', async () => {
    const res = await server.post('/api/user/login')
        .send({
            username,
            password
        })
    expect(res.body.errno).toBe(0)

    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息应该成功', async () => {
    const res = await server.patch('/api/user/change-info')
        .send({
            nickname: '测试名称',
            city: '测试城市',
            avatar: 'test.png'
        })
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码应该成功', async () => {
    const res = await server.patch('/api/user/change-password')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 删除
test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete-test')
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 退出登录
test('退出登录应该成功', async () => {
    const res = await server.post('/api/user/logout')
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
test('查询已删除的用户，应该不存在', async () => {
    const res = await server.post('/api/user/exist')
        .send({username})
    expect(res.body.errno).not.toBe(0)
})

