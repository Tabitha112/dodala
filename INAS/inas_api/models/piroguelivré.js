// models/pirogueLivreeModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer toutes les pirogues livrées
exports.getAllPiroguesLivrees = (callback) => {
    const query = 'SELECT * FROM piroguelivre';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Fonction pour récupérer une pirogue livrée par son ID
exports.getPirogueLivreeById = (id, callback) => {
    const query = 'SELECT * FROM piroguelivre WHERE id_piroguelivre = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer une nouvelle pirogue livrée
exports.createPirogueLivree = (pirogueLivreeData, callback) => {
    const query = `INSERT INTO piroguelivre (id_groupement, id_pirogue) VALUES (?, ?)`;
    const values = [
        pirogueLivreeData.id_groupement,
        pirogueLivreeData.id_pirogue
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_piroguelivre: results.insertId });
    });
};

// Fonction pour mettre à jour une pirogue livrée par son ID
exports.updatePirogueLivree = (id, pirogueLivreeData, callback) => {
    const query = `UPDATE piroguelivre 
                   SET id_groupement = ?, id_pirogue = ? 
                   WHERE id_piroguelivre = ?`;
    const values = [
        pirogueLivreeData.id_groupement,
        pirogueLivreeData.id_pirogue,
        id
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};

// Fonction pour supprimer une pirogue livrée par son ID
exports.deletePirogueLivree = (id, callback) => {
    const query = 'DELETE FROM piroguelivre WHERE id_piroguelivre = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};
