-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 26 Maj 2023, 17:10
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `integracjalaptops`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `laptops`
--

CREATE TABLE `laptops` (
  `id` int(11) NOT NULL,
  `producer` varchar(200) DEFAULT NULL,
  `diagonal` varchar(20) DEFAULT NULL,
  `resolution` varchar(20) DEFAULT NULL,
  `surface` varchar(50) DEFAULT NULL,
  `isTactile` varchar(10) DEFAULT NULL,
  `procesor` varchar(50) DEFAULT NULL,
  `coreNumber` varchar(20) DEFAULT NULL,
  `timingSpeed` varchar(20) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `discCapacity` varchar(20) DEFAULT NULL,
  `discType` varchar(20) DEFAULT NULL,
  `graphicsCard` varchar(100) DEFAULT NULL,
  `graphicsCardMemory` varchar(20) DEFAULT NULL,
  `operatingSystem` varchar(100) DEFAULT NULL,
  `physicalDrive` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `laptops`
--

INSERT INTO `laptops` (`id`, `producer`, `diagonal`, `resolution`, `surface`, `isTactile`, `procesor`, `coreNumber`, `timingSpeed`, `ram`, `discCapacity`, `discType`, `graphicsCard`, `graphicsCardMemory`, `operatingSystem`, `physicalDrive`) VALUES
(1, 'Dell', '12\"', '1600x1200', 'matowa', 'tak', 'intel i7', '4', '2800', '8GB', '240GB', 'SSD', 'intel HD Graphics 4000', '2GB', 'Windows 7 Home', ''),
(2, 'Asus', '14\"', '1600x900', 'matowa', 'nie', 'intel i5', '4', '', '16GB', '120GB', 'SSD', 'intel HD Graphics 5000', '1GB', '', 'brak'),
(3, 'Fujitsu', '14\"', '1920x1080', 'blyszczaca', 'tak', 'intel i7', '8', '1900', '24GB', '500GB', 'HDD', 'intel HD Graphics 520', '1GB', 'brak systemu', 'Blu-Ray'),
(4, 'Huawei', '13\"', '', 'matowa', 'nie', 'intel i7', '4', '2400', '12GB', '24GB', 'HDD', 'NVIDIA GeForce GTX 1050', '', '', 'brak'),
(5, 'MSI', '17\"', '1600x900', 'blyszczaca', 'tak', 'intel i7', '4', '3300', '8GB', '60GB', 'SSD', 'AMD Radeon Pro 455', '1GB', 'Windows 8.1 Profesional', 'DVD'),
(6, 'Dell', '', '1280x800', 'matowa', 'nie', 'intel i7', '4', '2800', '8GB', '240GB', 'SSD', '', '', 'Windows 7 Home', 'brak'),
(7, 'Asus', '14\"', '1600x900', 'matowa', 'nie', 'intel i5', '4', '2800', '', '120GB', 'SSD', 'intel HD Graphics 5000', '1GB', 'Windows 10 Home', ''),
(8, 'Fujitsu', '15\"', '1920x1080', 'blyszczaca', 'tak', 'intel i7', '8', '2800', '24GB', '500GB', 'HDD', 'intel HD Graphics 520', '', 'brak systemu', 'Blu-Ray'),
(9, 'Samsung', '13\"', '1366x768', 'matowa', 'nie', 'intel i7', '4', '2800', '12GB', '24GB', 'HDD', 'NVIDIA GeForce GTX 1050', '1GB', 'Windows 10 Home', 'brak'),
(10, 'Sony', '16\"', '', 'blyszczaca', 'tak', 'intel i7', '4', '2800', '8GB', '', '', 'AMD Radeon Pro 455', '1GB', 'Windows 7 Profesional', 'DVD'),
(11, 'Samsung', '12\"', '1280x800', 'matowa', 'nie', 'intel i7', '', '2120', '', '', '', 'intel HD Graphics 4000', '1GB', '', 'brak'),
(12, 'Samsung', '14\"', '1600x900', 'matowa', 'nie', 'intel i5', '', '', '', '', 'SSD', 'intel HD Graphics 5000', '1GB', 'Windows 10 Home', 'brak'),
(13, 'Fujitsu', '15\"', '1920x1080', 'blyszczaca', 'tak', 'intel i7', '8', '2800', '24GB', '500GB', 'HDD', 'intel HD Graphics 520', '', 'brak systemu', 'Blu-Ray'),
(14, 'Huawei', '13\"', '1366x768', 'matowa', 'nie', 'intel i7', '4', '3000', '', '24GB', 'HDD', 'NVIDIA GeForce GTX 1050', '', 'Windows 10 Home', 'brak'),
(15, 'MSI', '17\"', '1600x900', 'blyszczaca', 'tak', 'intel i7', '4', '9999', '8GB', '60GB', 'SSD', 'AMD Radeon Pro 455', '1GB', 'Windows 7 Profesional', ''),
(16, 'Huawei', '14\"', '', 'matowa', 'nie', 'intel i7', '4', '2200', '8GB', '16GB', 'HDD', 'NVIDIA GeForce GTX 1080', '', '', 'brak'),
(17, 'MSI', '17\"', '1600x900', 'blyszczaca', 'tak', 'intel i7', '4', '3300', '8GB', '60GB', 'SSD', 'AMD Radeon Pro 455', '1GB', '', ''),
(18, 'Asus', '', '1600x900', 'blyszczaca', 'tak', 'intel i5', '2', '3200', '16GB', '320GB', 'HDD', '', '', 'Windows 7 Home', 'brak'),
(19, 'Asus', '14\"', '1600x900', 'matowa', 'nie', 'intel i5', '4', '2800', '', '120GB', 'SSD', 'intel HD Graphics 5000', '1GB', 'Windows 10 Profesional', ''),
(20, 'Fujitsu', '14\"', '1280x800', 'blyszczaca', 'tak', 'intel i7', '8', '2800', '24GB', '500GB', 'HDD', 'intel HD Graphics 520', '', 'brak systemu', 'Blu-Ray'),
(21, 'Samsung', '12\"', '1600x900', '', 'nie', 'intel i5', '4', '2800', '12GB', '24GB', 'HDD', 'NVIDIA GeForce GTX 1050', '1GB', 'Windows 8.1 Home', 'brak'),
(22, 'Sony', '11\"', '', 'blyszczaca', 'tak', 'intel i7', '4', '2800', '8GB', '', '', 'AMD Radeon Pro 455', '1GB', 'Windows 7 Profesional', 'brak'),
(23, 'Samsung', '13\"', '1366x768', '', 'nie', 'intel i5', '', '2120', '', '', '', 'intel HD Graphics 4000', '2GB', '', 'DVD'),
(24, 'Samsung', '15\"', '1920x1080', 'matowa', 'nie', 'intel i9', '', '', '', '', 'SSD', 'intel HD Graphics 4000', '2GB', 'Windows 10 Profesional', 'Blu-Ray');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
