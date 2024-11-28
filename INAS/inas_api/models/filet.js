// models/filetModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Fonction pour récupérer tous les filets
exports.getAllFilets = (callback) => {
    const query = 'SELECT * FROM filet';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Fonction pour récupérer un filet spécifique par ID
exports.getFiletById = (id, callback) => {
    const query = 'SELECT * FROM filet WHERE id_filet = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Fonction pour créer un nouveau filet
exports.createFilet = (filetData, callback) => {
    const query = 'INSERT INTO filet (nom, grosseur_maille, volume, catégorie, id_pirogue) VALUES (?, ?, ?, ?, ?)';
    const values = [filetData.nom, filetData.grosseur_maille, filetData.volume, filetData.catégorie, filetData.id_pirogue];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: results.insertId, ...filetData });
    });
};

// Fonction pour mettre à jour un filet par ID
exports.updateFilet = (id, filetData, callback) => {
    const query = 'UPDATE filet SET nom = ?, grosseur_maille = ?, volume = ?, catégorie = ?, id_pirogue = ? WHERE id_filet = ?';
    const values = [filetData.nom, filetData.grosseur_maille, filetData.volume, filetData.catégorie, filetData.id_pirogue, id];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id, ...filetData });
    });
};

// Fonction pour supprimer un filet par ID
exports.deleteFilet = (id, callback) => {
    const query = 'DELETE FROM filet WHERE id_filet = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { message: 'Filet supprimé avec succès.' });
    });
};
