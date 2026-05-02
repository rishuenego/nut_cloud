export function isAuthenticated(req, res, next) {
    const isAuth = req.isAuthenticated && req.isAuthenticated();
    if (isAuth && req.user) {
        return next();
    }
    console.log('Auth Failure:', {
        isAuthenticated: isAuth,
        hasUser: !!req.user,
        sessionID: req.sessionID,
        hasSession: !!req.session,
        cookies: req.headers.cookie ? 'Present' : 'Missing'
    });
    res.status(401).json({ success: false, message: 'Unauthorized' });
}
export function isOptionalAuth(req, res, next) {
    next();
}
