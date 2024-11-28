const groupementModel = require('../models/groupement');

// Récupérer tous les groupements
exports.getAllGroupements = (req, res) => {
    groupementModel.getAllGroupements((err, groupements) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(groupements);
    });
};

// Récupérer un groupement par ID
exports.getGroupementById = (req, res) => {
    const { id } = req.params;
    groupementModel.getGroupementById(id, (err, groupement) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!groupement) {
            return res.status(404).json({ message: 'Groupement non trouvé' });
        }
        res.json(groupement);
    });
};

// Ajouter un nouveau groupement
exports.addGroupement = (req, res) => {
    const newGroupement = req.body;
    groupementModel.createGroupement(newGroupement, (err, groupement) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(groupement);
    });
};

// Mettre à jour un groupement existant
exports.updateGroupement = (req, res) => {
    const { id } = req.params;
    const updatedGroupement = req.body;
    groupementModel.updateGroupement(id, updatedGroupement, (err, groupement) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!groupement) {
            return res.status(404).json({ message: 'Groupement non trouvé' });
        }
        res.json(groupement);
    });
};

// Supprimer un groupement par ID
exports.deleteGroupement = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID du groupement est requis' });
    }

    groupementModel.deleteGroupement(id, (err, result) => {
        if (err) {
            if (err.message === 'Groupement non trouvé') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
};
