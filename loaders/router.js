const createError = require('http-errors');

exports.init = function (app) {
    let i = 1;

    //Frontend Routers
    const authRouter = require('../routes/auth');
    const usersRouter = require('../routes/users');
    const settingsRouter = require('../routes/settings');
    const botRouter = require('../routes/bot');
    const roomRouter = require('../routes/room');
    const ruleRouter = require('../routes/rule');
    const webhookRouter = require('../routes/webhook');
    const notificationRouter = require('../routes/notification');

    //Backend Routers
    const adminRouter = require('../routes/admin/index');

    //Frontend Routes
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/settings', settingsRouter);
    app.use('/bot', botRouter);
    app.use('/room', roomRouter);
    app.use('/rule', ruleRouter);
    app.use('/webhook', webhookRouter);
    app.use('/notification', notificationRouter);

    //Backend Routes
    app.use('/admin', adminRouter);

    // 404 Router
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // 500 Router
    app.use(function (err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};
