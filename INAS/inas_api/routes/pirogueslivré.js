// routes/pirogueLivreeRoutes.js
const express = require('express');
const router = express.Router();
const pirogueLivreeController = require('../controllers/plcontroller');

// Route pour récupérer toutes les pirogues livrées
router.get('/pirogues-livrees', pirogueLivreeController.getAllPiroguesLivrees);

// Route pour récupérer une pirogue livrée par son ID
router.get('/pirogues-livrees/:id', pirogueLivreeController.getPirogueLivreeById);

// Route pour créer une nouvelle pirogue livrée
router.post('/pirogues-livrees', pirogueLivreeController.createPirogueLivree);

// Route pour mettre à jour une pirogue livrée par son ID
router.put('/pirogues-livrees/:id', pirogueLivreeController.updatePirogueLivree);

// Route pour supprimer une pirogue livrée par son ID
router.delete('/pirogues-livrees/:id', pirogueLivreeController.deletePirogueLivree);

module.exports = router;
