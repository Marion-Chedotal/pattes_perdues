-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 01, 2024 at 10:41 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pattes_perdues`
--

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `street`, `postalCode`, `city`, `createdAt`, `updatedAt`) VALUES
(1, NULL, '44000', 'nantes', '2024-04-04 16:19:45', '2024-04-04 16:19:45'),
(2, NULL, '35000', 'Rennes', '2024-04-05 11:06:28', '2024-04-05 17:01:14'),
(3, NULL, '56000', 'vannes', '2024-04-06 09:58:45', '2024-04-06 09:58:45'),
(4, NULL, '56000', 'vannes', '2024-04-07 08:23:55', '2024-04-07 08:23:55'),
(5, NULL, '29000', 'brest', '2024-04-07 08:24:16', '2024-04-07 08:24:16'),
(6, NULL, '35000', 'Rennes', '2024-04-07 09:14:34', '2024-04-07 09:15:18'),
(7, NULL, '29000', 'brest', '2024-04-07 09:15:32', '2024-04-07 09:15:32'),
(8, NULL, '35000', 'rennes', '2024-04-07 09:35:29', '2024-04-07 09:35:29'),
(9, 'sefqd', '56000', 'test', '2024-04-08 16:02:34', '2024-04-08 16:02:34'),
(10, 'sefqd', '56000', 'test', '2024-04-08 16:04:02', '2024-04-08 16:04:02'),
(11, 'sefqd', '56000', 'test', '2024-04-08 16:04:48', '2024-04-08 16:04:48'),
(12, NULL, '33', 'bordeaux', '2024-04-11 09:13:16', '2024-04-11 09:13:16'),
(13, NULL, '56000', 'vannes', '2024-04-11 16:13:19', '2024-04-11 16:13:19'),
(14, 'test', '44000', 'Nantes', '2024-04-18 11:03:24', '2024-04-18 11:03:24'),
(15, 'test2', '56000', 'Vannes', '2024-04-18 11:05:03', '2024-04-18 11:05:03'),
(16, 'test2', '56000', 'Vannes', '2024-04-18 11:05:10', '2024-04-18 11:05:10'),
(17, 'aaa', '78000', 'Versailles', '2024-04-18 11:44:52', '2024-04-18 11:44:52'),
(18, 'aaaa', '22000', 'Druelle Balsac', '2024-04-18 11:48:10', '2024-04-18 11:48:10'),
(19, 'aaaa', '22000', 'Druelle Balsac', '2024-04-18 11:49:38', '2024-04-18 11:49:38'),
(20, 'aaaa', '22000', 'Druelle Balsac', '2024-04-18 11:53:18', '2024-04-18 11:53:18'),
(21, 'aaa', '45000', 'Orléans', '2024-04-18 11:55:00', '2024-04-18 11:55:00'),
(22, 'ee', '88000', 'Vaudéville', '2024-04-18 15:04:01', '2024-04-18 15:04:01'),
(23, 'ee', '88000', 'Vaudéville', '2024-04-18 15:04:05', '2024-04-18 15:04:05'),
(24, 'ee', '88000', 'Vaudéville', '2024-04-18 15:14:52', '2024-04-18 15:14:52'),
(25, 'ee', '88000', 'Vaudéville', '2024-04-18 15:15:18', '2024-04-18 15:15:18'),
(26, 'ee', '88000', 'Vaudéville', '2024-04-18 15:15:25', '2024-04-18 15:15:25'),
(27, 'eee', '56890', 'Meucon', '2024-04-18 15:19:29', '2024-04-18 15:19:29'),
(28, 'ccc', '56890', 'Plescop', '2024-04-18 15:20:21', '2024-04-18 15:20:21'),
(29, 'ccc', '56890', 'Plescop', '2024-04-18 15:22:46', '2024-04-18 15:22:46'),
(30, 'rue des étangs', '56890', 'Plescop', '2024-04-18 15:24:03', '2024-04-18 15:24:03'),
(31, 'sdqsd', '78500', 'Sartrouville', '2024-04-18 15:28:14', '2024-04-18 15:28:14'),
(32, 'azerty', '78000', 'Versailles', '2024-04-20 08:58:14', '2024-04-20 08:58:14'),
(33, 'azerty', '78000', 'Versailles', '2024-04-20 08:58:29', '2024-04-20 08:58:29'),
(34, 'azerty', '78000', 'Versailles', '2024-04-20 08:58:45', '2024-04-20 08:58:45'),
(35, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:06:55', '2024-04-20 09:06:55'),
(36, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:07:04', '2024-04-20 09:07:04'),
(37, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:07:26', '2024-04-20 09:07:26'),
(38, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:07:39', '2024-04-20 09:07:39'),
(39, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:07:47', '2024-04-20 09:07:47'),
(40, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:07:57', '2024-04-20 09:07:57'),
(41, 'aaaa', '42000', 'Saint-Étienne', '2024-04-20 09:08:07', '2024-04-20 09:08:07'),
(42, 'rue des étangs', '42000', 'Saint-Étienne', '2024-04-20 09:08:18', '2024-04-20 09:08:18'),
(43, 'zz', '44000', 'Nantes', '2024-04-20 09:42:26', '2024-04-20 09:42:26'),
(44, 'test', '29000', 'Quimper', '2024-04-20 18:43:32', '2024-04-20 18:43:32'),
(45, 'test', '29000', 'Quimper', '2024-04-20 18:44:28', '2024-04-20 18:44:28'),
(46, 'test', '29000', 'Quimper', '2024-04-20 18:45:08', '2024-04-20 18:45:08'),
(47, 'test', '29000', 'Quimper', '2024-04-20 18:46:19', '2024-04-20 18:46:19'),
(48, 'test', '29000', 'Quimper', '2024-04-20 18:46:37', '2024-04-20 18:46:37'),
(49, 'test', '29000', 'Quimper', '2024-04-20 18:47:18', '2024-04-20 18:47:18'),
(50, 'test', '44500', 'La Baule-Escoublac', '2024-04-20 18:47:53', '2024-04-20 18:47:53'),
(51, 'test', '44500', 'La Baule-Escoublac', '2024-04-20 18:48:00', '2024-04-20 18:48:00'),
(52, 'test', '44500', 'La Baule-Escoublac', '2024-04-20 18:48:23', '2024-04-20 18:48:23'),
(53, 'test', '44500', 'La Baule-Escoublac', '2024-04-20 18:48:31', '2024-04-20 18:48:31'),
(54, 'test', '29600', 'Morlaix', '2024-04-20 18:53:45', '2024-04-20 18:53:45'),
(55, 'est', '56000', 'Vannes', '2024-04-20 18:54:35', '2024-04-20 18:54:35'),
(56, 'est', '56000', 'Vannes', '2024-04-20 18:54:38', '2024-04-20 18:54:38'),
(57, 'est', '56000', 'Vannes', '2024-04-20 18:55:07', '2024-04-20 18:55:07'),
(58, 'est', '56000', 'Vannes', '2024-04-20 18:55:21', '2024-04-20 18:55:21'),
(59, 'ere', '78000', 'Versailles', '2024-04-22 19:22:31', '2024-04-22 19:22:31'),
(60, '12 rue du marais', '56000', 'Vannes', '2024-04-24 09:55:31', '2024-04-24 09:55:31'),
(61, '14 avenue du marais', '56800', 'Val d\'Oust', '2024-04-24 09:56:49', '2024-04-24 09:56:49'),
(62, 'rue du moulin', '58000', 'Challuy', '2024-04-27 09:32:53', '2024-04-27 09:32:53'),
(63, NULL, '56000', 'Vannes', '2024-04-27 19:10:30', '2024-04-27 19:10:30'),
(64, NULL, '56000', 'Vannes', '2024-04-27 19:14:03', '2024-04-27 19:14:03'),
(65, 'Rue du moulin', '56000', 'Vannes', '2024-04-29 16:59:22', '2024-04-29 16:59:22'),
(66, 'Allée du houx', '80500', 'Marestmontiers', '2024-04-29 17:00:31', '2024-04-29 17:00:31'),
(67, 'rue du calvaire', '44000', 'Nantes', '2024-04-29 17:01:36', '2024-04-29 17:01:36'),
(68, 'rue de la poste', '29000', 'Quimper', '2024-04-29 17:02:15', '2024-04-29 17:02:15'),
(69, 'place de la mairie', '56890', 'Plescop', '2024-04-29 17:03:10', '2024-04-29 17:03:10'),
(70, 'rue du midi', '56000', 'Vannes', '2024-04-29 17:03:48', '2024-04-29 17:03:48'),
(71, 'rue des allouettes', '85000', 'Mouilleron-le-Captif', '2024-04-29 17:04:53', '2024-04-29 17:04:53'),
(72, 'rue de l\'hopital', '56000', 'Vannes', '2024-04-29 17:05:33', '2024-04-29 17:05:33'),
(73, 'rue du port', '56890', 'Plescop', '2024-04-29 17:06:16', '2024-04-29 17:06:16'),
(74, NULL, '56000', 'Vannes', '2024-04-30 08:36:22', '2024-04-30 08:36:22'),
(75, 'test', '56000', 'Vannes', '2024-04-30 09:34:48', '2024-04-30 09:34:48');

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `createdAt`, `updatedAt`) VALUES
(1, '2024-04-07 09:16:34', '2024-04-07 09:16:34'),
(2, '2024-04-07 09:36:43', '2024-04-07 09:36:43'),
(3, '2024-04-07 09:37:08', '2024-04-07 09:37:08'),
(4, '2024-04-07 12:49:24', '2024-04-07 12:49:24'),
(5, '2024-04-07 13:04:14', '2024-04-07 13:04:14'),
(6, '2024-04-07 13:05:29', '2024-04-07 13:05:29'),
(8, '2024-04-11 16:22:50', '2024-04-11 16:22:50');

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `content`, `createdAt`, `updatedAt`, `ConversationId`, `receiverId`, `UserId`) VALUES
(1, 'salut çà va?', '2024-04-07 09:16:34', '2024-04-07 09:16:34', 1, 2, NULL),
(2, 'oui et toi as-tu pu avancer?', '2024-04-07 09:17:16', '2024-04-07 09:17:16', 1, NULL, 2),
(3, 'un peu?', '2024-04-07 09:17:45', '2024-04-07 09:17:45', 1, 2, NULL),
(4, 'cool, on va chercher ensemble demain?', '2024-04-07 09:18:24', '2024-04-07 09:18:24', 1, NULL, 2),
(5, 'oui, 17 ça te va ?', '2024-04-07 09:18:52', '2024-04-07 09:18:52', 1, 2, NULL),
(6, 'parfait, rdv devant la mairie', '2024-04-07 09:19:14', '2024-04-07 09:19:14', 1, NULL, 2),
(7, 'hello, j\'ai cru voir ton chat', '2024-04-07 09:36:43', '2024-04-07 09:36:43', 2, 2, 3),
(8, 'je ne devrais pas pouvoir t\'écrire', '2024-04-07 09:37:08', '2024-04-07 09:37:08', 3, NULL, 3),
(9, 'oh trop chouette, donne moi des détails', '2024-04-07 09:37:46', '2024-04-07 09:37:46', 2, 3, 2),
(11, 'je tente d\'écrire un message sur le post 14 sans indiquer son idreceiver', '2024-04-07 12:49:09', '2024-04-07 12:49:09', 1, 2, NULL),
(12, 'je tente d\'écrire un message sur le post 14 sans indiquer son idreceiver', '2024-04-07 12:49:24', '2024-04-07 12:49:24', 4, 2, NULL),
(13, 'je tente d\'écrire un message sur le post 14 sans indiquer son idreceiver', '2024-04-07 13:04:15', '2024-04-07 13:04:15', 5, 2, NULL),
(14, 'je tente d\'écrire un message sur le post 14 sans indiquer son idreceiver', '2024-04-07 13:05:29', '2024-04-07 13:05:29', 6, 2, NULL),
(19, 'sdfdfdfsfd', '2024-04-11 16:22:50', '2024-04-11 16:22:50', 8, 5, 4);

--
-- Dumping data for table `pet_category`
--

INSERT INTO `pet_category` (`id`, `label`, `createdAt`, `updatedAt`) VALUES
(1, 'Chiens', '2024-04-04 17:08:17', '2024-04-04 17:08:17'),
(2, 'Chats', '2024-04-04 17:08:29', '2024-04-04 17:08:29'),
(3, 'Autres', '2024-04-04 17:08:29', '2024-04-04 17:08:29');

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `gender`, `alert_date`, `description`, `name`, `tattoo`, `microchip`, `collar`, `distinctive_signs`, `picture`, `is_active`, `createdAt`, `updatedAt`, `AddressId`, `PetCategoryId`, `UserId`, `TypeId`) VALUES
(111, 'Mâle', '2024-04-29 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Mochi', 1, 0, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714409962762-87575233-piqsels.com-id-szbcd.jpg', 1, '2024-04-29 16:59:22', '2024-04-29 16:59:22', 65, 2, 5, 1),
(112, 'Mâle', '2024-04-30 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Pitou', 1, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410031924-304790010-charlesdeluvio-zqhe4qjVTJI-unsplash.jpg', 1, '2024-04-29 17:00:31', '2024-04-29 17:00:31', 66, 1, 2, 3),
(113, 'Inconnu', '2024-04-22 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'ne sais pas', 1, 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410096107-991778093-icone_autres.png', 1, '2024-04-29 17:01:36', '2024-04-29 17:01:36', 67, 3, 3, 2),
(114, 'Femelle', '2024-04-29 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Item', 0, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410135875-952902824-pexels-oÄuz-kaan-boÄa-16985825.jpg', 1, '2024-04-29 17:02:15', '2024-04-29 17:02:15', 68, 2, 3, 1),
(115, 'Mâle', '2024-04-12 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Cora', 1, 0, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410190365-239442611-rocco-stoppoloni-xyvZ6q4nhqE-unsplash.jpg', 1, '2024-04-29 17:03:10', '2024-04-29 17:03:10', 69, 3, 2, 1),
(116, 'Femelle', '2024-04-29 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Pégase', 1, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410228732-621117630-ryan-walton-uKtvYMGe8ls-unsplash.jpg', 1, '2024-04-29 17:03:48', '2024-04-29 17:03:48', 70, 1, 2, 3),
(117, 'Femelle', '2024-04-29 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Atchoum', 0, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410293458-67776048-pexels-oÄuz-kaan-boÄa-16985825.jpg', 1, '2024-04-29 17:04:53', '2024-04-29 17:04:53', 71, 2, 4, 3),
(118, 'Mâle', '2024-04-16 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'Saturne', 1, 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410333695-828232926-charlesdeluvio-zqhe4qjVTJI-unsplash.jpg', 1, '2024-04-29 17:05:33', '2024-04-29 17:05:33', 72, 1, 4, 1),
(119, 'Inconnu', '2024-04-23 00:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'ne sais pas', 1, 0, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', 'uploads\\1714410376039-181249490-kanashi-Xy7SLX9zuVM-unsplash.jpg', 1, '2024-04-29 17:06:16', '2024-04-29 17:06:16', 73, 1, 5, 2),
(120, 'Mâle', '2024-04-20 00:00:00', 'test', 'trst', 1, 1, 1, 'test', 'uploads\\1714469688364-154714921-charlesdeluvio-zqhe4qjVTJI-unsplash.jpg', 1, '2024-04-30 09:34:48', '2024-04-30 09:34:48', 75, 1, 5, 1);

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `label`, `createdAt`, `updatedAt`) VALUES
(1, 'Perdu', '2024-04-04 16:48:20', '2024-04-04 16:48:20'),
(2, 'Trouvé', '2024-04-04 16:48:20', '2024-04-04 16:48:20'),
(3, 'Volé', '2024-04-04 16:49:34', '2024-04-04 16:49:34');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `email`, `avatar`, `createdAt`, `updatedAt`, `AddressId`) VALUES
(2, 'Hello2hello2', '$2a$10$ZHiuUlYAPQZWK6AIb/mF7eHFTxxt.Gotesm8TScyapMdGSVqGZW/m', 'hello2@gmail.com', NULL, '2024-04-07 09:15:32', '2024-04-07 09:15:32', 7),
(3, 'Hello3hello3', '$2a$10$T/Oi7aQZ.gHYPfh9Sh.uaeoWhoiyrFwBoRcqL/SFWVxTm2oSIVk8m', 'hello3@gmail.com', NULL, '2024-04-07 09:35:29', '2024-04-07 09:35:29', 8),
(4, 'Hello4hello4', '$2a$10$GRCp1T8f1gjNpxQ8rBVCk.zo3J5jrLCGHEVcjX138eD8EfThbFJtG', 'hello4@gmail.com', NULL, '2024-04-11 09:13:16', '2024-04-11 09:13:16', 12),
(5, 'Hello5hello55', '$2a$10$FTQwD4SwK4529H7u9ARgjuZ6fKNcLQ3bb9f.D9j6FcG4x9/wwlpl2', 'hello5@gmail.com', NULL, '2024-04-11 16:13:19', '2024-04-29 22:05:15', 13),
(8, 'Hello5Hello5', '$2a$10$JaqHAyzxJfyxnPrWnD/P3./wOZggkL/QbgPG1258S3FXXiXchEnqa', 'heeeee@test.com', NULL, '2024-04-30 08:36:22', '2024-04-30 08:36:22', 74);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
