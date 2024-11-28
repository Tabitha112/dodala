const filetModel = require('../models/filet');

// Récupérer tous les filets
exports.getAllFilets = (req, res) => {
    filetModel.getAllFilets((err, filets) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(filets);
    });
};

// Récupérer un filet par ID
exports.getFiletById = (req, res) => {
    const { id } = req.params;
    filetModel.getFiletById(id, (err, filet) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!filet) {
            return res.status(404).json({ message: 'Filet non trouvé' });
        }
        res.json(filet);
    });
};

// Ajouter un nouveau filet
exports.addFilet = (req, res) => {
    const newFilet = req.body;
    filetModel.createFilet(newFilet, (err, filet) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(filet);
    });
};

// Mettre à jour un filet existant
exports.updateFilet = (req, res) => {
    const { id } = req.params;
    const updatedFilet = req.body;
    filetModel.updateFilet(id, updatedFilet, (err, filet) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!filet) {
            return res.status(404).json({ message: 'Filet non trouvé' });
        }
        res.json(filet);
    });
};

// Supprimer un filet par ID
exports.deleteFilet = (req, res) => {
    const { id } = req.params; // Récupérer l'ID du filet depuis req.params

    if (!id) {
        return res.status(400).json({ error: 'ID du filet est requis' });
    }

    filetModel.deleteFilet(id, (err, result) => {
        if (err) {
            if (err.message === 'Filet non trouvé') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Filet non trouvé' });
        }

        res.json({ message: `Filet avec ID ${id} supprimé avec succès` });
    });
};


