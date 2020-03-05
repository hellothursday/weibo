/**
 * @description 失败信息集合，包括 errno 和 message
 * @author qe
 */

module.exports = {
    // 用户名已存在
    USERNAME_EXIST: {
        errno: 10001,
        message: '用户名已存在'
    },
    REGISTER_FAIL: {
        errno: 10002,
        message: '注册失败，请重试'
    },
    USERNAME_NOT_EXIST: {
        errno: 10003,
        message: '用户名不存在'
    },
    LOGIN_FAIL: {
        errno: 10004,
        message: '登录失败，用户名或密码错误'
    },
    LOGIN_CHECK_FAIL: {
        errno: 10005,
        message: '您尚未登录'
    },
    CHANGE_PASSWORD_FAIL: {
        errno: 10006,
        message: '修改密码失败，请重试'
    },
    UPLOAD_FILE_SIZE_FAIL: {
        errno: 10007,
        message: '上传文件尺寸过大'
    },
    CHANGE_INFO_FAIL: {
        errno: 10008,
        message: '修改基本信息失败'
    },
    JSON_SCHEMA_FAIL: {
        errno: 10009,
        message: '数据格式校验错误'
    },
    DELETE_USER_FAIL: {
        errno: 10010,
        message: '删除用户失败'
    },
    ADD_FOLLOWER_FAIL: {
        errno: 10011,
        message: '添加关注失败'
    },
    DELETE_FOLLOWER_FAIL: {
        errno: 10012,
        message: '取消关注失败'
    },
    CREATE_BLOG_FAIL: {
        errno: 11001,
        message: '创建微博失败，请重试'
    },
    DELETE_BLOG_FAIL: {
        errno: 11002,
        message: '删除微博失败，请重试'
    },
    NOT_TEST_ENV: {
        errno: 12001,
        message: '当前非测试环境'
    }
}
