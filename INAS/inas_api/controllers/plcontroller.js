// controllers/pirogueLivreeController.js
const PirogueLivreeModel = require('../models/piroguelivré');

// Récupérer toutes les pirogues livrées
exports.getAllPiroguesLivrees = (req, res) => {
    PirogueLivreeModel.getAllPiroguesLivrees((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des pirogues livrées.' });
        }
        res.status(200).json(results);
    });
};

// Récupérer une pirogue livrée par son ID
exports.getPirogueLivreeById = (req, res) => {
    const id = req.params.id;
    PirogueLivreeModel.getPirogueLivreeById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération de la pirogue livrée.' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Pirogue livrée non trouvée.' });
        }
        res.status(200).json(result);
    });
};

// Créer une nouvelle pirogue livrée
exports.createPirogueLivree = (req, res) => {
    const pirogueLivreeData = {
        id_groupement: req.body.id_groupement,
        id_pirogue: req.body.id_pirogue
    };

    PirogueLivreeModel.createPirogueLivree(pirogueLivreeData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la création de la pirogue livrée.' });
        }
        res.status(201).json({ message: 'Pirogue livrée créée avec succès', id_piroguelivre: result.id_piroguelivre });
    });
};

// Mettre à jour une pirogue livrée par son ID
exports.updatePirogueLivree = (req, res) => {
    const id = req.params.id;
    const pirogueLivreeData = {
        id_groupement: req.body.id_groupement,
        id_pirogue: req.body.id_pirogue
    };

    PirogueLivreeModel.updatePirogueLivree(id, pirogueLivreeData, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de la pirogue livrée.' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Pirogue livrée non trouvée.' });
        }
        res.status(200).json({ message: 'Pirogue livrée mise à jour avec succès' });
    });
};

// Supprimer une pirogue livrée par son ID
exports.deletePirogueLivree = (req, res) => {
    const id = req.params.id;

    PirogueLivreeModel.deletePirogueLivree(id, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression de la pirogue livrée.' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Pirogue livrée non trouvée.' });
        }
        res.status(200).json({ message: 'Pirogue livrée supprimée avec succès' });
    });
};
