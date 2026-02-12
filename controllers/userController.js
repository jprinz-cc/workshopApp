const User = require('../models/User');

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
    createUser: async (req, res) => {
        const { name, email } = req.body;
        if (!name || !email){
            console.log("**POST createUser NOT SUCCESSFUL**");
            return res.status(400).json({ error: 'Name and Email are required'});
        }

        try {
            const newId = await User.create(name, email);
            console.log("**POST createUser SUCCESSFUL**");
            res.status(201).json({ message:'User created', id: newId});
        } catch (error) {
            console.log("**POST createUser NOT SUCCESSFUL**");
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;