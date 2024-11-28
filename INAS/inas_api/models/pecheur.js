delete require.cache[require.resolve('./db')];

const db = require('./db');

// Récupérer tous les pêcheurs
exports.getAllPecheurs = (callback) => {
    const query = 'SELECT * FROM pecheur';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Récupérer un pêcheur par ID
exports.getPecheurById = (id, callback) => {
    const query = 'SELECT * FROM pecheur WHERE id_pecheur = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Ajouter un nouveau pêcheur
exports.createPecheur = (newPecheur, callback) => {
    const query = `INSERT INTO pecheur (nom, prenom, sexe, date_naissance, lieu_naissance, adresse, n_tel, id_groupement)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        newPecheur.nom,
        newPecheur.prenom,
        newPecheur.sexe,
        newPecheur.date_naissance,
        newPecheur.lieu_naissance,
        newPecheur.adresse,
        newPecheur.n_tel,
        newPecheur.id_groupement,
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_pecheur: results.insertId, ...newPecheur });
    });
};

// Mettre à jour un pêcheur par ID
exports.updatePecheur = (id, updatedPecheur, callback) => {
    const query = `UPDATE pecheur SET nom = ?, prenom = ?, sexe = ?, date_naissance = ?, lieu_naissance = ?, adresse = ?, n_tel = ?, id_groupement = ? WHERE id_pecheur = ?`;
    const values = [
        updatedPecheur.nom,
        updatedPecheur.prenom,
        updatedPecheur.sexe,
        updatedPecheur.date_naissance,
        updatedPecheur.lieu_naissance,
        updatedPecheur.adresse,
        updatedPecheur.n_tel,
        updatedPecheur.id_groupement,
        id,
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Pêcheur non trouvé'));
        }
        callback(null, { id_pecheur: id, ...updatedPecheur });
    });
};

// Supprimer un pêcheur par ID
exports.deletePecheur = (id, callback) => {
    const query = 'DELETE FROM pecheur WHERE id_pecheur = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Pêcheur non trouvé'));
        }
        callback(null, { message: 'Pêcheur supprimé avec succès' });
    });
};

// Récupérer les pêcheurs par groupement
exports.getPecheursByGroupement = (id_groupement, callback) => {
    const query = 'SELECT * FROM pecheur WHERE id_groupement = ?';
    db.query(query, [id_groupement], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
