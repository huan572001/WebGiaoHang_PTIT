const authController = require("./authController");
exports.register = async (req,res) => {
    const { username ,  password , role } = req.body;
    try {
        if (!username || !password || !role) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await authController.registerService(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
};


exports.login = async (req,res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        // const a = customerService.roleUser(username)
        const response = await authController.loginService(req.body)
        return res.status(200).json({
            response

        })

    } catch (err) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + err
        })
    }
   
};