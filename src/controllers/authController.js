const bcrypt = require("bcryptjs");
const users = require("../data/users");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedRole = role.trim().toLowerCase();

        const allowedRoles = ["user", "admin"];

        if (!allowedRoles.includes(normalizedRole)) {
            return res.status(400).json({
                message: "Role must be either user or admin"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Please provide a valid email"
            });
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters and contain uppercase, lowercase, number, and special character"
            });
        }

        return res.status(200).json({
            message: "Validation successful"
        });


    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { register };
