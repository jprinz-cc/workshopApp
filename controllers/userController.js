const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    // GET /users
    getAllUsers: async (req, res) => {
        try{
            const users = await User.getAllUsers();
            console.log("**GET getAllUsers Successful**");
            res.json(users);
        } catch (error) {
            console.log("**GET getAllUsers NOT SUCCESSFUL**");
            res.status(500).json( { error: 'Database error'});
        }
    },
    // POST createUser
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password){
            console.log("**POST createUser NOT SUCCESSFUL**");
            return res.status(400).json({ error: 'Name, Email and Password are required'});
        }

        try {
            const hash = await bcrypt.hash(password, 10);
            console.log("Hash: ", hash);
            const newId = await User.create(name, email, hash);
            console.log("**POST createUser SUCCESSFUL**");
            res.status(201).json({ message:'User created', id: newId});
        } catch (error) {
            console.log("**POST createUser NOT SUCCESSFUL**");
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) return res.status(404).json({ error: "User not found"});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) res.status(400).json({ error: "Invalid Credentials"});

            const token = jwt.sign({id: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token});

        } catch (err){
            res.status(500).json({error: err.message});
        }
    }
};

module.exports = userController;