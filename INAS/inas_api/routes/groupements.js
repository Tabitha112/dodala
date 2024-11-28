const express = require('express');
const router = express.Router();
const groupementController = require('../controllers/grcontroller');

// Récupérer tous les groupements
router.get('/groupements', groupementController.getAllGroupements);

// Récupérer un groupement par ID
router.get('/groupements/:id', groupementController.getGroupementById);

// Ajouter un nouveau groupement
router.post('/groupements', groupementController.addGroupement);

// Mettre à jour un groupement par ID
router.put('/groupements/:id', groupementController.updateGroupement);

// Supprimer un groupement par ID
router.delete('/groupements/:id', groupementController.deleteGroupement);

module.exports = router;
