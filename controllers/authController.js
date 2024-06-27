const jwt = require('jsonwebtoken');
require('dotenv').config();

const dummyUser = {
    username: 'saltman',
    password: 'oai1122'
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (username === dummyUser.username && password === dummyUser.password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { login };
