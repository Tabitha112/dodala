const attributionModel = require('../models/attribution');

// Récupérer toutes les attributions
exports.getAllAttributions = (req, res) => {
    attributionModel.getAllAttributions((err, attributions) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(attributions);
    });
};

// Récupérer une attribution par ID
exports.getAttributionById = (req, res) => {
    const { id } = req.params;
    attributionModel.getAttributionById(id, (err, attribution) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!attribution) {
            return res.status(404).json({ message: 'Attribution non trouvée' });
        }
        res.json(attribution);
    });
};

// Récupérer les attributions pour un groupement spécifique
exports.getAttributionsByGroupement = (req, res) => {
    const { id_groupement } = req.params;
    attributionModel.getAttributionsByGroupement(id_groupement, (err, attributions) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(attributions);
    });
};

// Ajouter une nouvelle attribution
exports.addAttribution = (req, res) => {
    const newAttribution = req.body;
    attributionModel.createAttribution(newAttribution, (err, attribution) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(attribution);
    });
};

// Mettre à jour une attribution existante
exports.updateAttribution = (req, res) => {
    const { id } = req.params;
    const updatedAttribution = req.body;
    attributionModel.updateAttribution(id, updatedAttribution, (err, attribution) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!attribution) {
            return res.status(404).json({ message: 'Attribution non trouvée' });
        }
        res.json(attribution);
    });
};

// Supprimer une attribution par ID
exports.deleteAttribution = (req, res) => {
    const { id } = req.params; // Récupérer l'ID de l'attribution depuis req.params

    if (!id) {
        return res.status(400).json({ error: 'ID de l\'attribution est requis' });
    }

    attributionModel.deleteAttribution(id, (err, result) => {
        if (err) {
            if (err.message === 'Attribution non trouvée') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Attribution non trouvée' });
        }

        res.json({ message: `Attribution avec ID ${id} supprimée avec succès` });
    });
};

