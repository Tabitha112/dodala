const express = require('express');
const router = express.Router();
const factureController = require('../controllers/facontroller');

// Récupérer toutes les factures
router.get('/factures', factureController.getAllFactures);

// Récupérer une facture par ID
router.get('/factures/:id', factureController.getFactureById);

// Ajouter une nouvelle facture
router.post('/factures', factureController.addFacture);

// Mettre à jour une facture par ID
router.put('/factures/:id', factureController.updateFacture);

// Supprimer une facture par ID
router.delete('/factures/:id', factureController.deleteFacture);

module.exports = router;
