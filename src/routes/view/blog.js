/**
 * @description 微博 view 路由
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Redirect} = require('../../middlewares/login-guards')
const {getProfileBlogList, getSquareBlogList} = require('../../controller/blog')
const {getFollowers} = require('../../controller/userrelation')
const {exist} = require('../../controller/user')

// 首页
router.get('/', loginGuard4Redirect, async ctx => {
    await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginGuard4Redirect, async ctx => {
    const {username} = ctx.session.userInfo
    ctx.redirect(`/profile/${username}`)
})
router.get('/profile/:username', loginGuard4Redirect, async ctx => {
    // 已登录用户的信息
    const curUserInfo = ctx.session.userInfo
    let curUsername = curUserInfo.username
    const {username} = ctx.params

    const isMe = username === curUsername

    let userInfo
    if (isMe) {
        // 是当前登录用户
        userInfo = curUserInfo
    } else {
        const res = await exist(username)
        if (res.errno !== 0) {
            // 用户名不存在
            await ctx.render('404')
            return
        }
        // 用户名存在
        userInfo = res.data
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(username, 0)
    const {isEmpty, blogList, pageSize, page, count} = result.data

    // 获取粉丝
    const followerResult = await getFollowers(userInfo.id)
    const {count: followerCount, followerList} = followerResult.data
    const fansData = {
        count: followerCount,
        list: followerList
    }

    const amIFollowed = followerList.some(item => {
        return item.username === curUsername
    })

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            page,
            count
        },
        userData: {
            userInfo,
            isMe,
            fansData,
            amIFollowed
        }
    })
})

// 广场
router.get('/square', loginGuard4Redirect, async ctx => {
    // 获取微博数据，第一条
    const result = await getSquareBlogList(0)
    const {isEmpty, blogList, pageSize, page, count} = result.data
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            page,
            count
        }
    })
})

module.exports = router
