module.exports = {
    checkAuthenticated: function (res, req, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to view this page')
        res.redirect('/users/login')
    },
    checkNotAuthenticated: function (res, req, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next()
    },
}
