// models/groupementModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer tous les groupements
exports.getAllGroupements = (callback) => {
    const query = 'SELECT * FROM groupement';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Fonction pour récupérer un groupement par son ID
exports.getGroupementById = (id, callback) => {
    const query = 'SELECT * FROM groupement WHERE id_groupement = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer un nouveau groupement
exports.createGroupement = (newGroupement, callback) => {
    const query = 'INSERT INTO groupement (nom, adresse_geographique) VALUES (?, ?)';
    const values = [newGroupement.nom, newGroupement.adresse_geographique];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_groupement: results.insertId, ...newGroupement });
    });
};

// Fonction pour mettre à jour un groupement par son ID
exports.updateGroupement = (id, updatedGroupement, callback) => {
    const query = 'UPDATE groupement SET nom = ?, adresse_geographique = ? WHERE id_groupement = ?';
    const values = [updatedGroupement.nom, updatedGroupement.adresse_geographique, id];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Groupement non trouvé'));
        }
        callback(null, { id_groupement: id, ...updatedGroupement });
    });
};

// Fonction pour supprimer un groupement par son ID
exports.deleteGroupement = (id, callback) => {
    const query = 'DELETE FROM groupement WHERE id_groupement = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Groupement non trouvé'));
        }
        callback(null, { message: 'Groupement supprimé avec succès' });
    });
};


exports.getAllGroupementsPaginated = (offset, limit, callback) => {
    // Requête SQL avec pagination
    const query = `
        SELECT * FROM groupements
        LIMIT ? OFFSET ?
    `;

    // Exécuter la requête avec les paramètres
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // Compter le nombre total d'éléments pour la pagination
        db.query('SELECT COUNT(*) AS total FROM groupements', (countErr, countResults) => {
            if (countErr) {
                return callback(countErr, null);
            }

            const totalItems = countResults[0].total;
            const hasMore = offset + limit < totalItems; // Détermine s'il y a plus d'éléments à charger

            callback(null, { groupements: results, hasMore });
        });
    });
};