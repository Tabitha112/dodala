const zoneModel = require('../models/zone');

// Récupérer toutes les zones
exports.getAllZones = (req, res) => {
    zoneModel.getAllZones((err, zones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(zones);
    });
};

// Récupérer une zone par ID
exports.getZoneById = (req, res) => {
    const { id } = req.params;
    zoneModel.getZoneById(id, (err, zone) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!zone) {
            return res.status(404).json({ message: 'Zone non trouvée' });
        }
        res.json(zone);
    });
};

// Ajouter une nouvelle zone
exports.addZone = (req, res) => {
    const newZone = req.body;
    zoneModel.createZone(newZone, (err, zone) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(zone);
    });
};

// Mettre à jour une zone existante
exports.updateZone = (req, res) => {
    const { id } = req.params;
    const updatedZone = req.body;
    zoneModel.updateZoneById(id, updatedZone, (err, zone) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!zone) {
            return res.status(404).json({ message: 'Zone non trouvée' });
        }
        res.json(zone);
    });
};

// Supprimer une zone par ID
exports.deleteZone = (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la zone depuis req.params

    if (!id) {
        return res.status(400).json({ error: "ID de la zone est requis" });
    }

    zoneModel.deleteZone(id, (err, result) => {
        if (err) {
            if (err.message === 'Zone non trouvée') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Zone non trouvée' });
        }

        res.json({ message: `Zone avec ID ${id} supprimée avec succès` });
    });
};
