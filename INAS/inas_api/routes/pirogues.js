const express = require('express');
const router = express.Router();
const pirogueController = require('../controllers/picontroller');

// Récupérer toutes les pirogues
router.get('/pirogues', pirogueController.getAllPirogues);

// Récupérer une pirogue par ID
router.get('/pirogues/:id', pirogueController.getPirogueById);

// Ajouter une nouvelle pirogue
router.post('/pirogues', pirogueController.addPirogue);

// Mettre à jour une pirogue par ID
router.put('/pirogues/:id', pirogueController.updatePirogue);

// Supprimer une pirogue par ID
router.delete('/pirogues/:id', pirogueController.deletePirogue);

module.exports = router;
