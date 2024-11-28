const factureModel = require('../models/facture');

// Récupérer toutes les factures
exports.getAllFactures = (req, res) => {
    factureModel.getAllFactures((err, factures) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(factures);
    });
};

// Récupérer une facture par ID
exports.getFactureById = (req, res) => {
    const { id } = req.params;
    factureModel.getFactureById(id, (err, facture) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!facture) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.json(facture);
    });
};

// Ajouter une nouvelle facture
exports.addFacture = (req, res) => {
    const newFacture = req.body;
    factureModel.createFacture(newFacture, (err, factureId) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_facture: factureId, ...newFacture });
    });
};

// Mettre à jour une facture existante
exports.updateFacture = (req, res) => {
    const { id } = req.params;
    const updatedFacture = req.body;
    factureModel.updateFacture(id, updatedFacture, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.json({ message: 'Facture mise à jour avec succès' });
    });
};

// Supprimer une facture par ID
exports.deleteFacture = (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la facture depuis req.params

    if (!id) {
        return res.status(400).json({ error: 'ID de la facture est requis' });
    }

    factureModel.deleteFacture(id, (err, result) => {
        if (err) {
            if (err.message === 'Facture non trouvée') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Facture non trouvée' });
        }

        res.json({ message: `Facture avec ID ${id} supprimée avec succès` });
    });
};


