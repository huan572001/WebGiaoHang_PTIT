const authRouter = require("./auth");


const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter);

    return app.use('/', (req,res) => {
        res.send('server on...')
    })
}

module.exports = initRouter;