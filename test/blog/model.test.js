/**
 * @description blog model unit test
 * @author qe
 */

const {Blog} = require('../../src/db/models')

test('微博数据模型各个属性符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/test.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/test.png')
})


