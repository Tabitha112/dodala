const pirogueModel = require('../models/pirogue');

// Récupérer toutes les pirogues
exports.getAllPirogues = (req, res) => {
    pirogueModel.getAllPirogues((err, pirogues) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(pirogues);
    });
};

// Récupérer une pirogue par ID
exports.getPirogueById = (req, res) => {
    const { id } = req.params;
    pirogueModel.getPirogueById(id, (err, pirogue) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pirogue) {
            return res.status(404).json({ message: 'Pirogue non trouvée' });
        }
        res.json(pirogue);
    });
};

// Ajouter une nouvelle pirogue
exports.addPirogue = (req, res) => {
    const newPirogue = req.body;
    pirogueModel.createPirogue(newPirogue, (err, pirogue) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(pirogue);
    });
};

// Mettre à jour une pirogue existante
exports.updatePirogue = (req, res) => {
    const { id } = req.params;
    const updatedPirogue = req.body;
    pirogueModel.updatePirogue(id, updatedPirogue, (err, pirogue) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!pirogue) {
            return res.status(404).json({ message: 'Pirogue non trouvée' });
        }
        res.json(pirogue);
    });
};

// Supprimer une pirogue par ID
exports.deletePirogue = (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la pirogue depuis req.params

    if (!id) {
        return res.status(400).json({ error: 'ID de la pirogue est requis' });
    }

    pirogueModel.deletePirogue(id, (err, result) => {
        if (err) {
            if (err.message === 'Pirogue non trouvée') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pirogue non trouvée' });
        }

        res.json({ message: `Pirogue avec ID ${id} supprimée avec succès` });
    });
};

