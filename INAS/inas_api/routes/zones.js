const express = require('express');
const router = express.Router();
const zoneController = require('../controllers/zocontroller');

// Récupérer toutes les zones
router.get('/zones', zoneController.getAllZones);

// Récupérer une zone par ID
router.get('/zones/:id', zoneController.getZoneById);

// Ajouter une nouvelle zone
router.post('/zones', zoneController.addZone);

// Mettre à jour une zone par ID
router.put('/zones/:id', zoneController.updateZone);

// Supprimer une zone par ID
router.delete('/zones/:id', zoneController.deleteZone);

module.exports = router;
