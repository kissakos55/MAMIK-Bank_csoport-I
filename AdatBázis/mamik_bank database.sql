-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 03. 09:31
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mamik_bank`
--
CREATE DATABASE IF NOT EXISTS `mamik_bank` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mamik_bank`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `Id` int(11) NOT NULL,
  `FelhasznaloNev` varchar(100) NOT NULL,
  `TeljesNev` varchar(60) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `HASH` varchar(64) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Jogosultsag` int(1) NOT NULL,
  `Aktiv` int(1) NOT NULL,
  `RegisztracioDatuma` datetime DEFAULT current_timestamp(),
  `FenykepUtvonal` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`Id`, `FelhasznaloNev`, `TeljesNev`, `SALT`, `HASH`, `Email`, `Jogosultsag`, `Aktiv`, `RegisztracioDatuma`, `FenykepUtvonal`) VALUES
(1, 'a', 'Lakatos Iván', 'jQGX8grO1yjNqhiZbtROcseiqj1NVZJd2iqlfxPx1GKLJ9H8smnLJ9dloScCK6Zp', 'c4ed28f0fc354b42563a8bc03b2754d0ae853ce934038ed32cba8f420e284a37', 'lakatosi@gmail.com', 9, 1, '2024-11-25 07:33:49', 'szandi.jpg'),
(3, 'Mammer', 'Mammer Ma', 'erfrv', 'beteb', 'mammervagyok@gmail.com', 2, 1, '2025-01-14 07:19:53', ''),
(10, 'string', 'string', 'string', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', 'string', 1, 0, '2025-01-22 07:50:49', 'string'),
(11, 'b', 'b', '1ZbHLMzOnYPznkuKgFeqhQk7LTqvL7JjDGrTmPDwumrtoYnW9960V1LyjIUupvav', 'ec8b396ce0dfab43af034a4f7e5b50ec506d4b3fecb2766d2c40dce2dc87d5df', 'b', 1, 0, '2025-01-22 07:54:19', 'default.jpg'),
(12, 'c', 'Minka Lajos', 'HHD29Xsz48CCnFZ8jrxKaojrGbLWF3olAiZ9TIBKuTYNAZFOZCc42Kn9qpmQGbpA', 'de35c924ad3df39068154903a27325edce86dce752f43a5e5d1073d825c6d101', 'battyaa@gmail.com', 1, 0, '2025-01-22 07:55:22', 'default.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hitelkartyak`
--

CREATE TABLE `hitelkartyak` (
  `Id` int(11) NOT NULL,
  `kartya_azonosito` int(24) NOT NULL,
  `ugyfel_azonosito` int(11) NOT NULL,
  `kartyaszam` int(24) NOT NULL,
  `lejarati_datum` date NOT NULL,
  `CVV_kod` int(3) NOT NULL,
  `hitelkeret` int(11) NOT NULL,
  `elerheto_hitelkeret` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamlak`
--

CREATE TABLE `szamlak` (
  `Id` int(11) NOT NULL,
  `szamla_azonosito` int(24) NOT NULL,
  `ugyfel_azonosito` int(11) NOT NULL,
  `szamlatipus` varchar(15) NOT NULL,
  `penznem` varchar(5) NOT NULL,
  `egyenleg` int(10) UNSIGNED NOT NULL,
  `nyitasi_datum` date NOT NULL,
  `statusz` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szamlak`
--

INSERT INTO `szamlak` (`Id`, `szamla_azonosito`, `ugyfel_azonosito`, `szamlatipus`, `penznem`, `egyenleg`, `nyitasi_datum`, `statusz`) VALUES
(3, 0, 11, '', '', 0, '0000-00-00', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tranzakciok`
--

CREATE TABLE `tranzakciok` (
  `Id` int(11) NOT NULL,
  `tranzakcio_azonosito` int(8) NOT NULL,
  `szamla_azonosito` int(24) NOT NULL,
  `tranzakcio_tipusa` varchar(15) NOT NULL,
  `osszeg` int(10) UNSIGNED NOT NULL,
  `tranzakcio_datuma` date NOT NULL,
  `kedvezmenyezett_szamla` int(24) NOT NULL,
  `leiras` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tranzakciok`
--

INSERT INTO `tranzakciok` (`Id`, `tranzakcio_azonosito`, `szamla_azonosito`, `tranzakcio_tipusa`, `osszeg`, `tranzakcio_datuma`, `kedvezmenyezett_szamla`, `leiras`) VALUES
(1, 0, 0, '', 0, '0000-00-00', 0, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfelek`
--

CREATE TABLE `ugyfelek` (
  `id` int(11) NOT NULL,
  `ugyfel_azonosito` int(11) NOT NULL,
  `nev` varchar(40) NOT NULL,
  `szuletesi_datum` date NOT NULL,
  `szemelyi_igazolvany_szam` varchar(11) NOT NULL,
  `lakcim` varchar(80) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefonszam` int(11) NOT NULL,
  `regisztracio_datuma` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ugyfelek`
--

INSERT INTO `ugyfelek` (`id`, `ugyfel_azonosito`, `nev`, `szuletesi_datum`, `szemelyi_igazolvany_szam`, `lakcim`, `email`, `telefonszam`, `regisztracio_datuma`) VALUES
(1, 11, '', '0000-00-00', '', '', '', 0, '0000-00-00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`);

--
-- A tábla indexei `hitelkartyak`
--
ALTER TABLE `hitelkartyak`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `kartya_azonosito` (`kartya_azonosito`) USING BTREE,
  ADD KEY `ugyfel_azonosito` (`ugyfel_azonosito`);

--
-- A tábla indexei `szamlak`
--
ALTER TABLE `szamlak`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `szamla_azonosito` (`szamla_azonosito`) USING BTREE,
  ADD KEY `ugyfel_azonosito` (`ugyfel_azonosito`);

--
-- A tábla indexei `tranzakciok`
--
ALTER TABLE `tranzakciok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `szamla_azonosito` (`szamla_azonosito`) USING BTREE,
  ADD KEY `tranzakcio_azonosito` (`tranzakcio_azonosito`) USING BTREE;

--
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ugyfel_azonosito` (`ugyfel_azonosito`) USING BTREE;

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `hitelkartyak`
--
ALTER TABLE `hitelkartyak`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szamlak`
--
ALTER TABLE `szamlak`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tranzakciok`
--
ALTER TABLE `tranzakciok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `hitelkartyak`
--
ALTER TABLE `hitelkartyak`
  ADD CONSTRAINT `hitelkartyak_ibfk_1` FOREIGN KEY (`ugyfel_azonosito`) REFERENCES `ugyfelek` (`ugyfel_azonosito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szamlak`
--
ALTER TABLE `szamlak`
  ADD CONSTRAINT `szamlak_ibfk_3` FOREIGN KEY (`ugyfel_azonosito`) REFERENCES `ugyfelek` (`ugyfel_azonosito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tranzakciok`
--
ALTER TABLE `tranzakciok`
  ADD CONSTRAINT `tranzakciok_ibfk_1` FOREIGN KEY (`szamla_azonosito`) REFERENCES `szamlak` (`szamla_azonosito`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD CONSTRAINT `ugyfelek_ibfk_1` FOREIGN KEY (`ugyfel_azonosito`) REFERENCES `felhasznalok` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
