const fetch = require("node-fetch");

exports.authController = async (req, res) => {
    const { username, password } = req.body || {};

    if (username === 'admin' && password === 'password') {
        return res.send('credenziali corrette');
    }

    return res.send('credenziali errate');
};