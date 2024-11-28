const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // ou 127.0.0.1
    user: 'root', // par défaut, c'est 'root' pour XAMPP
    password: '', // Laissez vide si vous n'avez pas de mot de passe
    database: 'inas' // Remplacez par le nom de votre base de données
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = db;
