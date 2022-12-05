const authRouter = require("./auth");
const cusRouter = require("./customer");



const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter);

    // customer
    app.use('/api/v1/customer',cusRouter)
    return app.use('/', (req,res) => {
        res.send('server on...')
    })
}

module.exports = initRouter;