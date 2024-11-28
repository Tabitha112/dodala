const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Inscription utilisateur
exports.signupUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = {
            username,
            email,
            password: hashedPassword,
            role
        };

        // Ajouter l'utilisateur dans la base de données
        const user = await userModel.addUser(newUser);

        // Générer un token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Retourner le token et les informations de l'utilisateur
        res.status(201).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
};

// Récupérer un utilisateur par ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    userModel.getUserById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    });
};

// Ajouter un nouvel utilisateur
exports.addUser = (req, res) => {
    const newUser = req.body;
    userModel.addUser(newUser, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(user);
    });
};

// Mettre à jour un utilisateur existant
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    userModel.updateUser(id, updatedUser, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    });
};

// Supprimer un utilisateur par ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};
