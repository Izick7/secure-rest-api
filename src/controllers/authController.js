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

        const userExists = users.find(user => user.email === normalizedEmail);

        if (userExists) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash = bcrypt.hash(password, 10)
        const newUser = {
            id: users.length + 1,
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
            role: normalizedRole
        };
        users.push(newUser);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { register };
