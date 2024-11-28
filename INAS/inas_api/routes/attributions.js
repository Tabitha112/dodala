const express = require('express');
const router = express.Router();
const attributionController = require('../controllers/atcontroller');

// Récupérer toutes les attributions
router.get('/attributions', attributionController.getAllAttributions);

// Récupérer une attribution par ID
router.get('/attributions/:id', attributionController.getAttributionById);

// Récupérer les attributions pour un groupement spécifique
router.get('/groupements/:id_groupement/attributions', attributionController.getAttributionsByGroupement);

// Ajouter une nouvelle attribution
router.post('/attributions', attributionController.addAttribution);

// Mettre à jour une attribution par ID
router.put('/attributions/:id', attributionController.updateAttribution);

// Supprimer une attribution par ID
router.delete('/attributions/:id', attributionController.deleteAttribution);

module.exports = router;
