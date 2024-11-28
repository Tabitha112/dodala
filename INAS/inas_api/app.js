const express = require('express');
const app = express();
const cors = require('cors');  // Import CORS middleware

// Import des routes
const factureRoutes = require('./routes/factures');
const pirogueRoutes = require('./routes/pirogues');
const groupementRoutes = require('./routes/groupements');
const filetRoutes = require('./routes/filets');
const pecheurRoutes = require('./routes/pecheurs');
const zoneRoutes = require('./routes/zones');
const authRoutes = require('./routes/auth');
const attributionRoutes = require('./routes/attributions');
const pirogueLivreeRoutes = require('./routes/pirogueslivré'); // Nouvelle route pour les pirogues livrées

app.use(express.json());
app.use(cors());

// Route pour accéder à la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API !');
});

// Utilisation des routes
app.use('/api', factureRoutes);
app.use('/api', pirogueRoutes);
app.use('/api', groupementRoutes);
app.use('/api', filetRoutes);
app.use('/api', pecheurRoutes);
app.use('/api', zoneRoutes);
app.use('/api', authRoutes);
app.use('/api', attributionRoutes);
app.use('/api', pirogueLivreeRoutes);  // Utilisation de la nouvelle route

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
