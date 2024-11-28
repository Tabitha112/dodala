const express = require('express');
const router = express.Router();
const userController = require('../controllers/authcontroller');

// Route de connexion
router.post('/login', userController.loginUser);

// Route d'inscription
router.post('/signup', userController.signupUser);

// Récupérer tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/users/:id', userController.getUserById);

// Ajouter un nouvel utilisateur
router.post('/users', userController.addUser);

// Mettre à jour un utilisateur par ID
router.put('/users/:id', userController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
