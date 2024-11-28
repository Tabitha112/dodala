import React from 'react';
import { Link } from 'react-router-dom';
import '../'; // Assurez-vous de créer ce fichier CSS pour le style

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>
      <div className="dashboard-links">
        <div className="dashboard-item">
          <h2>Groupements</h2>
          <Link to="/web/groupements" className="dashboard-link">Voir tous les groupements</Link>
          <Link to="/web/groupements/create" className="dashboard-link">Créer un groupement</Link>
        </div>
        <div className="dashboard-item">
          <h2>Pêcheurs</h2>
          <Link to="/web/pecheurs" className="dashboard-link">Voir tous les pêcheurs</Link>
          <Link to="/web/pecheurs/create" className="dashboard-link">Ajouter un pêcheur</Link>
        </div>
        <div className="dashboard-item">
          <h2>Factures</h2>
          <Link to="/web/factures" className="dashboard-link">Voir toutes les factures</Link>
          <Link to="/web/factures/create" className="dashboard-link">Créer une facture</Link>
        </div>
        <div className="dashboard-item">
          <h2>Zones</h2>
          <Link to="/web/zones" className="dashboard-link">Voir toutes les zones</Link>
          <Link to="/web/zones/create" className="dashboard-link">Créer une zone</Link>
        </div>
        <div className="dashboard-item">
          <h2>Attributions</h2>
          <Link to="/web/attributions" className="dashboard-link">Voir toutes les attributions</Link>
          <Link to="/web/attributions/create" className="dashboard-link">Créer une attribution</Link>
        </div>
        <div className="dashboard-item">
          <h2>Pirogues</h2>
          <Link to="/web/pirogues" className="dashboard-link">Voir toutes les pirogues</Link>
          <Link to="/web/pirogues/create" className="dashboard-link">Créer une pirogue</Link>
        </div>
        <div className="dashboard-item">
          <h2>Filets</h2>
          <Link to="/web/filets" className="dashboard-link">Voir tous les filets</Link>
          <Link to="/web/filets/create" className="dashboard-link">Ajouter un filet</Link>
        </div>
        <div className="dashboard-item">
          <h2>Types de Pirogues</h2>
          <Link to="/web/types" className="dashboard-link">Voir tous les types de pirogues</Link>
          <Link to="/web/types/create" className="dashboard-link">Créer un type de pirogue</Link>
        </div>
        <div className="dashboard-item">
          <h2>Catégories de Filets</h2>
          <Link to="/web/categories" className="dashboard-link">Voir toutes les catégories de filets</Link>
          <Link to="/web/categories/create" className="dashboard-link">Créer une catégorie de filet</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
