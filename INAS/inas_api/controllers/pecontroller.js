const pecheurModel = require('../models/pecheur');

// Récupérer tous les pêcheurs
exports.getAllPecheurs = (req, res) => {
    pecheurModel.getAllPecheurs((err, pecheurs) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(pecheurs);
    });
};

// Récupérer un pêcheur par ID
exports.getPecheurById = (req, res) => {
    const { id } = req.params;
    pecheurModel.getPecheurById(id, (err, pecheur) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pecheur) {
            return res.status(404).json({ message: 'Pêcheur non trouvé' });
        }
        res.json(pecheur);
    });
};

exports.addPecheur = (req, res) => {
    const newPecheur = req.body;
    pecheurModel.createPecheur(newPecheur, (err, pecheur) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(pecheur);
    });
};


// Mettre à jour un pêcheur existant
exports.updatePecheur = (req, res) => {
    const { id } = req.params;
    const updatedPecheur = req.body;
    pecheurModel.updatePecheur(id, updatedPecheur, (err, pecheur) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pecheur) {
            return res.status(404).json({ message: 'Pêcheur non trouvé' });
        }
        res.json(pecheur);
    });
};

// Supprimer un pêcheur par ID
exports.deletePecheur = (req, res) => {
    const { id } = req.params; // Récupérer l'ID du pêcheur depuis req.params

    if (!id) {
        return res.status(400).json({ error: "L'ID du pêcheur est requis." });
    }

    pecheurModel.deletePecheur(id, (err, result) => {
        if (err) {
            if (err.message === 'Pêcheur non trouvé') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pêcheur non trouvé." });
        }

        res.json({ message: "Pêcheur supprimé avec succès." });
    });
};


// Récupérer les pêcheurs par groupement
exports.getPecheursByGroupement = (req, res) => {
    const { id_groupement } = req.params;
    pecheurModel.getPecheursByGroupement(id_groupement, (err, pecheurs) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pecheurs || pecheurs.length === 0) {
            return res.status(404).json({ message: 'Aucun pêcheur trouvé pour ce groupement' });
        }
        res.json(pecheurs);
    });
};
