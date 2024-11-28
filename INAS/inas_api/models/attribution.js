// models/attributionModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer toutes les attributions
exports.getAllAttributions = (callback) => {
    const query = 'SELECT * FROM attribution';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);a
        }
        callback(null, results);
    });
};

// Fonction pour récupérer une attribution par son ID
exports.getAttributionById = (id, callback) => {
    const query = 'SELECT * FROM attribution WHERE id_attribution = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer une nouvelle attribution
exports.createAttribution = (attributionData, callback) => {
    const query = 'INSERT INTO attribution (id_groupement, id_zone, date_debut, date_fin) VALUES (?, ?, ?, ?)';
    const values = [attributionData.id_groupement, attributionData.id_zone, attributionData.date_debut, attributionData.date_fin];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_attribution: results.insertId, ...attributionData });
    });
};

// Fonction pour mettre à jour une attribution par son ID
exports.updateAttribution = (id, attributionData, callback) => {
    const query = 'UPDATE attribution SET id_groupement = ?, id_zone = ?, date_debut = ?, date_fin = ? WHERE id_attribution = ?';
    const values = [attributionData.id_groupement, attributionData.id_zone,attributionData.nom_groupement, attributionData.nom_zone, attributionData.date_debut, attributionData.date_fin, id];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_attribution: id, ...attributionData });
    });
};

// Fonction pour supprimer une attribution par son ID
exports.deleteAttribution = (id, callback) => {
    const query = 'DELETE FROM attribution WHERE id_attribution = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { message: 'Attribution supprimée avec succès.' });
    });
};
