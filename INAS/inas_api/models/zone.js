delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer toutes les zones
exports.getAllZones = (callback) => {
    const query = 'SELECT * FROM zone';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Fonction pour récupérer une zone par son ID
exports.getZoneById = (id, callback) => {
    const query = 'SELECT * FROM zone WHERE id_zone = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer une nouvelle zone
exports.createZone = (zoneData, callback) => {
    const query = 'INSERT INTO zone (nom_zone, superficie, distance_mer, droit_peche_journalier, prix_metre_carre) VALUES (?, ?, ?, ?, ?)';
    const { nom_zone, superficie, distance_mer, droit_peche_journalier, prix_metre_carre } = zoneData;
    db.query(query, [nom_zone, superficie, distance_mer, droit_peche_journalier, prix_metre_carre], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

// Fonction pour mettre à jour une zone par son ID
exports.updateZoneById = (id, zoneData, callback) => {
    const query = 'UPDATE zone SET nom_zone = ?, superficie = ?, distance_mer = ?, droit_peche_journalier = ?, prix_metre_carre = ? WHERE id_zone = ?';
    const { nom_zone, superficie, distance_mer, droit_peche_journalier, prix_metre_carre } = zoneData;
    db.query(query, [nom_zone, superficie, distance_mer, droit_peche_journalier, prix_metre_carre, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};

// Fonction pour supprimer une zone par son ID
exports.deleteZoneById = (id, callback) => {
    const query = 'DELETE FROM zone WHERE id_zone = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};
