const bcrypt = require("bcryptjs");
const users = require("../data/users");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        console.log(name, email, password, role);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { register };