/**
 * @description blog api unit test
 * @author qe
 */

const server = require('../server')

// 存储 cookie
let COOKIE = ''

// 存储 blog id
let BLOG_ID = 0
let USERNAME = ''
// 创建新用户并登录
test('创建新用户并登录', async () => {
    const username = `u2_${Date.now()}`
    const password = `p2_${Date.now()}`
    const nickname = username
    const gender = 1

    const user = {
        username,
        password,
        nickname,
        gender
    }

    // 注册
    await server.post('/api/user/register')
        .send(user)
    // 登录
    const res = await server.post('/api/user/login')
        .send({
            username,
            password
        })
    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(';')
    USERNAME = username
})

// 创建微博
test('创建一条微博，应该成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的内容_' + Date.now()
    const image = '/xxx.png'
    // 开始测试
    const res = await server.post('/api/blog/create')
        .send({content, image})
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    // 记录微博id
    BLOG_ID = res.body.data.id
})

// 创建更多
test('创建更多微博，应该成功', async () => {
    for (let i = 0; i < 20; i++) {
        // 定义测试内容
        const content = '单元测试自动创建的内容_' + Date.now() + Math.random()
        const image = '/xxx.png'
        // 开始测试
        const res = await server.post('/api/blog/create')
            .send({content, image})
            .set('Cookie', COOKIE)
        expect(res.body.errno).toBe(0)
        expect(res.body.data.content).toBe(content)
        expect(res.body.data.image).toBe(image)
        // 记录微博id
        BLOG_ID = res.body.data.id
    }
})

// 加载个人主页微博数据
test('个人主页，加载第一页数据，应该成功', async () => {
    const res = await server.get(`/api/profile/load-more/${USERNAME}/0`)
        .set('Cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('page')
    expect(data).toHaveProperty('count')
})

// 删除用户并退出
test('删除用户并退出', async () => {
    // 删除用户，并级联删除blog
    await server.post('/api/user/delete-test')
        .set('Cookie', COOKIE)
    // 退出登录
    await server.post('/api/user/logout')
        .set('Cookie', COOKIE)
})
