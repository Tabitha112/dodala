-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 28 nov. 2024 à 20:09
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `inas`
--

-- --------------------------------------------------------

--
-- Structure de la table `attribution`
--

CREATE TABLE `attribution` (
  `id_attribution` int(11) NOT NULL,
  `id_groupement` int(11) NOT NULL,
  `id_zone` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `attribution`
--

INSERT INTO `attribution` (`id_attribution`, `id_groupement`, `id_zone`, `date_debut`, `date_fin`) VALUES
(1, 1, 1, '2024-01-15', '2024-02-04'),
(2, 1, 2, '2024-02-05', '2024-02-25'),
(3, 2, 1, '2024-01-25', '2024-02-14'),
(4, 2, 2, '2024-02-15', '2024-03-06'),
(5, 3, 1, '2024-01-30', '2024-02-19'),
(6, 3, 2, '2024-02-20', '2024-03-11'),
(7, 4, 1, '2024-01-20', '2024-02-09'),
(8, 4, 2, '2024-02-10', '2024-03-01'),
(9, 5, 1, '2024-01-12', '2024-02-01'),
(10, 5, 2, '2024-02-02', '2024-02-22'),
(46, 1, 2, '2024-09-25', '2024-09-30'),
(47, 5, 2, '2024-09-13', '2024-09-29'),
(48, 5, 5, '2024-09-20', '2024-09-21'),
(49, 2, 3, '2024-09-07', '2024-09-02'),
(50, 1, 3, '2024-10-18', '2024-11-01'),
(51, 2, 2, '2024-10-18', '2024-10-16');

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE `facture` (
  `id_facture` int(11) NOT NULL,
  `date` date NOT NULL,
  `mois_facturé` varchar(50) NOT NULL,
  `droit_journalier` decimal(10,0) NOT NULL,
  `prix_mettre_carre` decimal(10,0) NOT NULL,
  `prix_pirogue` decimal(10,0) NOT NULL,
  `montant_total` decimal(10,0) NOT NULL,
  `id_groupement` int(11) NOT NULL,
  `id_zone` int(11) NOT NULL,
  `id_pirogue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id_facture`, `date`, `mois_facturé`, `droit_journalier`, `prix_mettre_carre`, `prix_pirogue`, `montant_total`, `id_groupement`, `id_zone`, `id_pirogue`) VALUES
(1, '2024-02-05', 'Janvier 2024', 20, 10, 1000, 2000, 1, 1, 1),
(2, '2024-03-05', 'Février 2024', 20, 10, 1500, 2500, 1, 2, 2),
(3, '2024-02-05', 'Janvier 2024', 20, 10, 1100, 2100, 2, 1, 4),
(4, '2024-03-05', 'Février 2024', 20, 10, 1400, 2400, 2, 2, 5),
(5, '2024-02-05', 'Janvier 2024', 20, 10, 1050, 2050, 3, 1, 7),
(6, '2024-03-05', 'Février 2024', 20, 10, 1550, 2550, 3, 2, 8),
(7, '2024-02-05', 'Janvier 2024', 20, 10, 1150, 2150, 4, 1, 10),
(8, '2024-03-05', 'Février 2024', 20, 10, 1450, 2450, 4, 2, 11),
(9, '2024-02-05', 'Janvier 2024', 20, 10, 1020, 2020, 5, 1, 13),
(10, '2024-03-05', 'Février 2024', 20, 10, 1480, 2480, 5, 2, 14);

-- --------------------------------------------------------

--
-- Structure de la table `filet`
--

CREATE TABLE `filet` (
  `id_filet` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `grosseur_maille` enum('grosse','moyen','petit') DEFAULT NULL,
  `volume` decimal(65,0) NOT NULL,
  `id_pirogue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `filet`
--

INSERT INTO `filet` (`id_filet`, `nom`, `grosseur_maille`, `volume`, `id_pirogue`) VALUES
(1, '', 'grosse', 2, 1),
(2, '', 'moyen', 1, 1),
(3, '', 'petit', 1, 1),
(4, '', 'grosse', 2, 2),
(5, '', 'moyen', 1, 2),
(6, '', 'petit', 1, 2),
(7, '', 'grosse', 2, 3),
(8, '', 'moyen', 1, 3),
(9, '', 'petit', 1, 3),
(10, '', 'grosse', 2, 4),
(11, '', 'moyen', 1, 4),
(12, '', 'petit', 1, 4),
(13, '', 'grosse', 2, 5),
(14, '', 'moyen', 1, 5),
(15, '', 'petit', 1, 5),
(16, '', 'grosse', 2, 6),
(17, '', 'moyen', 1, 6),
(18, '', 'petit', 1, 6),
(19, '', 'grosse', 2, 7),
(20, '', 'moyen', 1, 7),
(21, '', 'petit', 1, 7),
(22, '', 'grosse', 2, 8),
(23, '', 'moyen', 1, 8),
(24, '', 'petit', 1, 8),
(25, '', 'grosse', 2, 9),
(26, '', 'moyen', 1, 9),
(27, '', 'petit', 1, 9),
(28, '', 'grosse', 2, 10),
(29, '', 'moyen', 1, 10),
(30, '', 'petit', 1, 10),
(31, '', 'grosse', 2, 11),
(32, '', 'moyen', 1, 11),
(33, '', 'petit', 1, 11),
(34, '', 'grosse', 2, 12),
(35, '', 'moyen', 1, 12),
(36, '', 'petit', 1, 12),
(37, '', 'grosse', 2, 13),
(38, '', 'moyen', 1, 13),
(39, '', 'petit', 1, 13),
(40, '', 'grosse', 2, 14),
(41, '', 'moyen', 1, 14),
(42, '', 'petit', 1, 14),
(43, '', 'grosse', 2, 15),
(44, '', 'moyen', 1, 15),
(45, '', 'petit', 1, 15);

-- --------------------------------------------------------

--
-- Structure de la table `groupement`
--

CREATE TABLE `groupement` (
  `id_groupement` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `adresse_geographique` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groupement`
--

INSERT INTO `groupement` (`id_groupement`, `nom`, `adresse_geographique`) VALUES
(1, 'Groupement A', 'Adresse A'),
(2, 'Groupement B', 'Adresse B'),
(3, 'Groupement C', 'Adresse C'),
(4, 'Groupement D', 'Adresse D'),
(5, 'Groupement E', 'Adresse E');

-- --------------------------------------------------------

--
-- Structure de la table `pecheur`
--

CREATE TABLE `pecheur` (
  `id_pecheur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `sexe` varchar(1) NOT NULL,
  `date_naissance` date NOT NULL,
  `lieu_naissance` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `n_tel` int(8) NOT NULL,
  `id_groupement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pecheur`
--

INSERT INTO `pecheur` (`id_pecheur`, `nom`, `prenom`, `sexe`, `date_naissance`, `lieu_naissance`, `adresse`, `n_tel`, `id_groupement`) VALUES
(1, 'Diop', 'Ousmane', 'M', '1985-05-12', 'Dakar', '123 Rue de la Mer, Dakar', 77432101, 1),
(2, 'Ndiaye', 'Awa', 'F', '1990-07-08', 'Dakar', '124 Rue de la Mer, Dakar', 77432102, 1),
(3, 'Sarr', 'Mamadou', 'M', '1988-02-20', 'Dakar', '125 Rue de la Mer, Dakar', 77432103, 1),
(4, 'Faye', 'Adama', 'M', '1982-09-15', 'Dakar', '126 Rue de la Mer, Dakar', 77432104, 1),
(5, 'Ba', 'Fatou', 'F', '1995-12-01', 'Dakar', '127 Rue de la Mer, Dakar', 77432105, 1),
(6, 'Fall', 'Alioune', 'M', '1987-06-21', 'Saint-Louis', '456 Rue de l\'Océan, Dakar', 77432106, 2),
(7, 'Mbaye', 'Seynabou', 'F', '1992-03-11', 'Saint-Louis', '457 Rue de l\'Océan, Dakar', 77432107, 2),
(8, 'Gueye', 'Moussa', 'M', '1986-10-05', 'Saint-Louis', '458 Rue de l\'Océan, Dakar', 77432108, 2),
(9, 'Kane', 'Mariama', 'F', '1993-01-17', 'Saint-Louis', '459 Rue de l\'Océan, Dakar', 77432109, 2),
(10, 'Thiam', 'Ibrahima', 'M', '1984-11-30', 'Saint-Louis', '460 Rue de l\'Océan, Dakar', 77432110, 2),
(11, 'Dieng', 'Moustapha', 'M', '1989-04-14', 'Rufisque', '789 Rue du Port, Dakar', 77432111, 3),
(12, 'Sow', 'Aminata', 'F', '1991-08-24', 'Rufisque', '790 Rue du Port, Dakar', 77432112, 3),
(13, 'Dia', 'Cheikh', 'M', '1983-03-08', 'Rufisque', '791 Rue du Port, Dakar', 77432113, 3),
(14, 'Sy', 'Khady', 'F', '1994-12-25', 'Rufisque', '792 Rue du Port, Dakar', 77432114, 3),
(15, 'Diallo', 'Issa', 'M', '1981-07-16', 'Rufisque', '793 Rue du Port, Dakar', 77432115, 3),
(16, 'Camara', 'Boubacar', 'M', '1988-11-03', 'Ziguinchor', '101 Rue des Pêcheurs, Dakar', 77432116, 4),
(17, 'Barry', 'Khadim', 'M', '1990-05-07', 'Ziguinchor', '102 Rue des Pêcheurs, Dakar', 77432117, 4),
(18, 'Konaté', 'Aissatou', 'F', '1992-09-12', 'Ziguinchor', '103 Rue des Pêcheurs, Dakar', 77432118, 4),
(19, 'Cissé', 'Abdoulaye', 'M', '1985-06-18', 'Ziguinchor', '104 Rue des Pêcheurs, Dakar', 77432119, 4),
(20, 'Samb', 'Khadidiatou', 'F', '1993-02-27', 'Ziguinchor', '105 Rue des Pêcheurs, Dakar', 77432120, 4);

-- --------------------------------------------------------

--
-- Structure de la table `pirogue`
--

CREATE TABLE `pirogue` (
  `id_pirogue` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `longueur` decimal(65,0) NOT NULL,
  `largeur` decimal(65,0) NOT NULL,
  `hauteur` decimal(65,0) NOT NULL,
  `volume` decimal(65,0) NOT NULL,
  `prix_pirogue` int(255) NOT NULL,
  `date_acquisition` date NOT NULL,
  `type` enum('pagaie','moteur') DEFAULT NULL,
  `id_groupement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pirogue`
--

INSERT INTO `pirogue` (`id_pirogue`, `nom`, `longueur`, `largeur`, `hauteur`, `volume`, `prix_pirogue`, `date_acquisition`, `type`, `id_groupement`) VALUES
(1, 'blanc', 5, 2, 1, 11, 1000, '2024-11-29', 'pagaie', 0),
(2, '', 6, 2, 2, 19, 1500, '2024-02-20', 'moteur', 0),
(3, 'blanc', 5, 2, 1, 8, 900, '2024-11-28', 'moteur', 0),
(4, '', 6, 2, 1, 11, 1100, '2024-01-25', 'moteur', 0),
(5, '', 6, 2, 1, 17, 1400, '2024-02-28', 'pagaie', 0),
(6, '', 5, 2, 1, 10, 950, '2024-03-15', 'moteur', 0),
(7, '', 5, 2, 1, 11, 1050, '2024-01-30', 'pagaie', 0),
(8, '', 6, 2, 2, 18, 1550, '2024-02-15', 'moteur', 0),
(9, '', 5, 2, 1, 9, 920, '2024-03-05', 'pagaie', 0),
(10, '', 6, 2, 1, 12, 1150, '2024-01-20', 'moteur', 0),
(11, '', 6, 2, 2, 17, 1450, '2024-02-10', 'pagaie', 0),
(12, '', 5, 2, 1, 10, 970, '2024-03-12', 'moteur', 0),
(13, '', 5, 2, 1, 10, 1020, '2024-01-12', 'pagaie', 0),
(14, '', 6, 2, 1, 17, 1480, '2024-02-05', 'moteur', 0),
(15, '', 5, 2, 1, 9, 930, '2024-03-01', 'pagaie', 0),
(16, 'vert', 5, 2, 1, 9, 930, '2024-11-29', 'pagaie', 1),
(17, 'jaune', 1212, 1212, 14, 250, 300, '2024-11-29', 'moteur', 3);

-- --------------------------------------------------------

--
-- Structure de la table `piroguelivre`
--

CREATE TABLE `piroguelivre` (
  `id_piroguelivre` int(11) NOT NULL,
  `id_groupement` int(11) NOT NULL,
  `id_pirogue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin1', 'admin1@example.com', 'hashed_password1', 'admin', '2024-01-01 12:00:00'),
(2, 'user1', 'user1@example.com', 'hashed_password2', 'user', '2024-01-02 12:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `zone`
--

CREATE TABLE `zone` (
  `id_zone` int(11) NOT NULL,
  `nom_zone` varchar(100) NOT NULL,
  `superficie` decimal(65,0) NOT NULL,
  `distance_mer` decimal(65,0) NOT NULL,
  `droit_peche_journalier` varchar(125) NOT NULL,
  `prix_mettre_carre` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `zone`
--

INSERT INTO `zone` (`id_zone`, `nom_zone`, `superficie`, `distance_mer`, `droit_peche_journalier`, `prix_mettre_carre`) VALUES
(1, 'Zone A', 100, 5, '200', 16),
(2, 'Zone B\r\n', 150, 10, '250', 20),
(3, 'Zone C', 200, 7, '220', 19),
(4, 'Zone D', 180, 12, '260', 23),
(5, 'Zone E', 120, 8, '210', 17);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `attribution`
--
ALTER TABLE `attribution`
  ADD PRIMARY KEY (`id_attribution`),
  ADD KEY `id_zone` (`id_zone`),
  ADD KEY `id_groupement` (`id_groupement`);

--
-- Index pour la table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`id_facture`),
  ADD KEY `id_pirogue` (`id_pirogue`),
  ADD KEY `id_groupement` (`id_groupement`),
  ADD KEY `id_zone` (`id_zone`);

--
-- Index pour la table `filet`
--
ALTER TABLE `filet`
  ADD PRIMARY KEY (`id_filet`),
  ADD KEY `id_pirogue` (`id_pirogue`);

--
-- Index pour la table `groupement`
--
ALTER TABLE `groupement`
  ADD PRIMARY KEY (`id_groupement`);

--
-- Index pour la table `pecheur`
--
ALTER TABLE `pecheur`
  ADD PRIMARY KEY (`id_pecheur`),
  ADD KEY `id_groupement` (`id_groupement`);

--
-- Index pour la table `pirogue`
--
ALTER TABLE `pirogue`
  ADD PRIMARY KEY (`id_pirogue`);

--
-- Index pour la table `piroguelivre`
--
ALTER TABLE `piroguelivre`
  ADD PRIMARY KEY (`id_piroguelivre`),
  ADD KEY `id_groupement` (`id_groupement`),
  ADD KEY `id_pirogue` (`id_pirogue`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id_zone`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attribution`
--
ALTER TABLE `attribution`
  MODIFY `id_attribution` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `filet`
--
ALTER TABLE `filet`
  MODIFY `id_filet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `groupement`
--
ALTER TABLE `groupement`
  MODIFY `id_groupement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `pecheur`
--
ALTER TABLE `pecheur`
  MODIFY `id_pecheur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `pirogue`
--
ALTER TABLE `pirogue`
  MODIFY `id_pirogue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `piroguelivre`
--
ALTER TABLE `piroguelivre`
  MODIFY `id_piroguelivre` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `zone`
--
ALTER TABLE `zone`
  MODIFY `id_zone` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `attribution`
--
ALTER TABLE `attribution`
  ADD CONSTRAINT `attribution_ibfk_1` FOREIGN KEY (`id_zone`) REFERENCES `zone` (`id_zone`),
  ADD CONSTRAINT `attribution_ibfk_2` FOREIGN KEY (`id_groupement`) REFERENCES `groupement` (`id_groupement`);

--
-- Contraintes pour la table `facture`
--
ALTER TABLE `facture`
  ADD CONSTRAINT `facture_ibfk_3` FOREIGN KEY (`id_pirogue`) REFERENCES `pirogue` (`id_pirogue`),
  ADD CONSTRAINT `facture_ibfk_5` FOREIGN KEY (`id_groupement`) REFERENCES `groupement` (`id_groupement`),
  ADD CONSTRAINT `facture_ibfk_6` FOREIGN KEY (`id_zone`) REFERENCES `zone` (`id_zone`);

--
-- Contraintes pour la table `filet`
--
ALTER TABLE `filet`
  ADD CONSTRAINT `filet_ibfk_2` FOREIGN KEY (`id_pirogue`) REFERENCES `pirogue` (`id_pirogue`);

--
-- Contraintes pour la table `pecheur`
--
ALTER TABLE `pecheur`
  ADD CONSTRAINT `pecheur_ibfk_1` FOREIGN KEY (`id_groupement`) REFERENCES `groupement` (`id_groupement`);

--
-- Contraintes pour la table `piroguelivre`
--
ALTER TABLE `piroguelivre`
  ADD CONSTRAINT `piroguelivre_ibfk_1` FOREIGN KEY (`id_groupement`) REFERENCES `groupement` (`id_groupement`),
  ADD CONSTRAINT `piroguelivre_ibfk_2` FOREIGN KEY (`id_pirogue`) REFERENCES `pirogue` (`id_pirogue`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
