// models/factureModel.js
delete require.cache[require.resolve('./db')];

const db = require('./db');

// Récupérer toutes les factures
exports.getAllFactures = (callback) => {
    const query = 'SELECT * FROM facture';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Récupérer une facture par son ID
exports.getFactureById = (id, callback) => {
    const query = 'SELECT * FROM facture WHERE id_facture = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Créer une nouvelle facture
exports.createFacture = (facture, callback) => {
    const query = `
        INSERT INTO facture (date, mois_facturé, droit_journalier, prix_mettre_carre, prix_pirogue, montant_total, id_groupement, id_zone, id_attribution, id_pirogue) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        facture.date,
        facture.mois_facturé,
        facture.droit_journalier,
        facture.prix_mettre_carre,
        facture.prix_pirogue,
        facture.montant_total,
        facture.id_groupement,
        facture.id_zone,
        facture.id_pirogue
    ];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id_facture: results.insertId });
    });
};

// Mettre à jour une facture
exports.updateFacture = (id, facture, callback) => {
    const query = `
        UPDATE facture 
        SET date = ?, mois_facturé = ?, droit_journalier = ?, prix_mettre_carre = ?, prix_pirogue = ?, montant_total = ?, id_groupement = ?, id_zone = ?, id_attribution = ?, id_pirogue = ? 
        WHERE id_facture = ?
    `;
    const values = [
        facture.date,
        facture.mois_facturé,
        facture.droit_journalier,
        facture.prix_mettre_carre,
        facture.prix_pirogue,
        facture.montant_total,
        facture.id_groupement,
        facture.id_zone,
        facture.id_pirogue,
        id
    ];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Supprimer une facture
exports.deleteFacture = (id, callback) => {
    const query = 'DELETE FROM facture WHERE id_facture = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
