delete require.cache[require.resolve('./db')];

const db = require('./db');

// Récupérer tous les utilisateurs
exports.getAllUsers = (callback) => {
    const query = 'SELECT * FROM user'; // Correction du nom de la table
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Récupérer un utilisateur par son ID
exports.getUserById = (id, callback) => {
    const query = 'SELECT * FROM user WHERE id = ?'; // Correction du nom de la colonne
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};


// Récupérer un utilisateur par son email
exports.getUserByEmail = (email, callback = () => {}) => {  // Default to empty function
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return callback(err); // In case of error, call callback with error
        }
        callback(null, results[0]); // Return the first result (user) if found
    });
};
 


// Ajouter un nouvel utilisateur
exports.addUser = (newUser, callback = () => {}) => {
    const query = 'INSERT INTO user (username, email, password, role, age) VALUES (?, ?, ?, ?, ?)'; // Ajout de la colonne email et age
    db.query(query, [newUser.username, newUser.email, newUser.password, newUser.role, newUser.age], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: results.insertId, ...newUser });
    });
};

// Mettre à jour un utilisateur existant
exports.updateUser = (id, updatedUser, callback) => {
    const query = 'UPDATE user SET username = ?, email = ?, password = ?, role = ?, age = ? WHERE id = ?'; // Ajout de la colonne email et age
    db.query(query, [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.role, updatedUser.age, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id, ...updatedUser });
    });
};

// Supprimer un utilisateur par son ID
exports.deleteUser = (id, callback) => {
    const query = 'DELETE FROM user WHERE id = ?'; // Correction du nom de la colonne
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { message: 'Utilisateur supprimé avec succès' });
    });
};
