const express = require('express');
const router = express.Router();
const filetController = require('../controllers/ficontroller');

// Récupérer tous les filets
router.get('/filets', filetController.getAllFilets);

// Récupérer un filet par ID
router.get('/filets/:id', filetController.getFiletById);

// Ajouter un nouveau filet
router.post('/filets', filetController.addFilet);

// Mettre à jour un filet par ID
router.put('/filets/:id', filetController.updateFilet);

// Supprimer un filet par ID
router.delete('/filets/:id', filetController.deleteFilet);

module.exports = router;
