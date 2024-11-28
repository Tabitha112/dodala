const express = require('express');
const router = express.Router();
const pecheursController = require('../controllers/pecontroller');

// Route pour voir les pêcheurs d'un groupement spécifique
router.get('/groupements/:id_groupement/pecheurs', pecheursController.getPecheursByGroupement);

// Route pour voir un pêcheur spécifique par ID
router.get('/pecheurs/:id', pecheursController.getPecheurById);

// Voir tous les pêcheurs
router.get('/pecheurs', pecheursController.getAllPecheurs);

// Ajouter un nouveau pêcheur
router.post('/pecheurs', pecheursController.addPecheur);


// Mettre à jour un pêcheur par ID
router.put('/pecheurs/:id', pecheursController.updatePecheur);

// Supprimer un pêcheur par ID
router.delete('/pecheurs/:id', pecheursController.deletePecheur);

module.exports = router;