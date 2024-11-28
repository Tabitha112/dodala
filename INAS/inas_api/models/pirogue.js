// models/pirogueModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer toutes les pirogues
exports.getAllPirogues = (callback) => {
    const query = 'SELECT * FROM pirogue';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Fonction pour récupérer une pirogue par son ID
exports.getPirogueById = (id, callback) => {
    const query = 'SELECT * FROM pirogue WHERE id_pirogue = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer une nouvelle pirogue
exports.createPirogue = (pirogueData, callback) => {
    const query = `INSERT INTO pirogue 
                   (nom, longueur, largeur, hauteur, volume, prix_pirogue, date_acquisition, type, id_groupement) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        pirogueData.nom,
        pirogueData.longueur,
        pirogueData.largeur,
        pirogueData.hauteur,
        pirogueData.volume,
        pirogueData.prix_pirogue,
        pirogueData.date_acquisition,
        pirogueData.type,
        pirogueData.id_groupement
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_pirogue: results.insertId });
    });
};

// Fonction pour mettre à jour une pirogue par son ID
exports.updatePirogue = (id, pirogueData, callback) => {
    const query = `UPDATE pirogue 
                   SET nom = ?, longueur = ?, largeur = ?, hauteur = ?, volume = ?, prix_pirogue = ?, date_acquisition = ?, type = ? 
                   WHERE id_pirogue = ?`;
    const values = [
        pirogueData.nom,
        pirogueData.longueur,
        pirogueData.largeur,
        pirogueData.hauteur,
        pirogueData.volume,
        pirogueData.prix_pirogue,
        pirogueData.date_acquisition,
        pirogueData.type,
        id
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};

// Fonction pour supprimer une pirogue par son ID
exports.deletePirogue = (id, callback) => {
    const query = 'DELETE FROM pirogue WHERE id_pirogue = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};
