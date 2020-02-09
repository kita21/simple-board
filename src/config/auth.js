module.exports = {
    secret: 'catrenglth',
    redirect: {
        success: "/",
        failure: "/account/login",
        permission: "/account/login"
    },

    role: {
        admin: ['admin', 'user'],
        user: ['user'],
    }
}
