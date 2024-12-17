-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 16. 08:28
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
-- Tábla szerkezet ehhez a táblához `felhasznaloi_fiok`
--

CREATE TABLE `felhasznaloi_fiok` (
  `FelhasznaloId` int(8) NOT NULL,
  `UgyfelId` int(8) NOT NULL,
  `Felhasznalonev` varchar(15) NOT NULL,
  `Jelszo` varchar(20) NOT NULL,
  `UtolsoBelepes` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  `RegisztracioDatuma` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`Id`, `FelhasznaloNev`, `TeljesNev`, `SALT`, `HASH`, `Email`, `Jogosultsag`, `Aktiv`, `RegisztracioDatuma`) VALUES
(1, 'Lakatos István', '', '', '', 'lakatosi@gmail.com', 9, 1, '2024-11-25 07:33:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hitelkartyak`
--

CREATE TABLE `hitelkartyak` (
  `kartya_azonosito` int(24) NOT NULL,
  `ugyfel_azonosito` int(8) NOT NULL,
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
  `szamla_azonosito` int(24) NOT NULL,
  `ugyfel_azonosito` int(8) NOT NULL,
  `szamlatipus` varchar(15) NOT NULL,
  `penznem` varchar(5) NOT NULL,
  `egyenleg` int(10) UNSIGNED NOT NULL,
  `nyitasi_datum` date NOT NULL,
  `statusz` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tranzakciok`
--

CREATE TABLE `tranzakciok` (
  `tranzakcio_azonosito` int(8) NOT NULL,
  `szamla_azonosito` int(8) NOT NULL,
  `tranzakcio_tipusa` varchar(15) NOT NULL,
  `osszeg` int(10) UNSIGNED NOT NULL,
  `tranzakcio_datuma` date NOT NULL,
  `kedvezmenyezett_szamla` int(24) NOT NULL,
  `leiras` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfelek`
--

CREATE TABLE `ugyfelek` (
  `ugyfel_azonosito` int(8) NOT NULL,
  `nev` varchar(40) NOT NULL,
  `szuletesi_datum` date NOT NULL,
  `szemelyi_igazolvany_szam` varchar(11) NOT NULL,
  `lakcim` varchar(80) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefonszam` int(11) NOT NULL,
  `regisztracio_datuma` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznaloi_fiok`
--
ALTER TABLE `felhasznaloi_fiok`
  ADD PRIMARY KEY (`FelhasznaloId`),
  ADD KEY `ugyfel_azonosito` (`UgyfelId`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A tábla indexei `hitelkartyak`
--
ALTER TABLE `hitelkartyak`
  ADD PRIMARY KEY (`kartya_azonosito`),
  ADD KEY `ugyfel_azonosito` (`ugyfel_azonosito`);

--
-- A tábla indexei `szamlak`
--
ALTER TABLE `szamlak`
  ADD PRIMARY KEY (`szamla_azonosito`),
  ADD KEY `ugyfel_azonosito` (`ugyfel_azonosito`);

--
-- A tábla indexei `tranzakciok`
--
ALTER TABLE `tranzakciok`
  ADD PRIMARY KEY (`tranzakcio_azonosito`),
  ADD KEY `szamla_azonosito` (`szamla_azonosito`);

--
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`ugyfel_azonosito`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznaloi_fiok`
--
ALTER TABLE `felhasznaloi_fiok`
  MODIFY `FelhasznaloId` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `hitelkartyak`
--
ALTER TABLE `hitelkartyak`
  MODIFY `kartya_azonosito` int(24) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szamlak`
--
ALTER TABLE `szamlak`
  MODIFY `szamla_azonosito` int(24) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tranzakciok`
--
ALTER TABLE `tranzakciok`
  MODIFY `tranzakcio_azonosito` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `ugyfel_azonosito` int(8) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `felhasznaloi_fiok`
--
ALTER TABLE `felhasznaloi_fiok`
  ADD CONSTRAINT `felhasznaloi_fiok_ibfk_1` FOREIGN KEY (`UgyfelId`) REFERENCES `ugyfelek` (`ugyfel_azonosito`);

--
-- Megkötések a táblához `szamlak`
--
ALTER TABLE `szamlak`
  ADD CONSTRAINT `szamlak_ibfk_1` FOREIGN KEY (`ugyfel_azonosito`) REFERENCES `ugyfelek` (`ugyfel_azonosito`),
  ADD CONSTRAINT `szamlak_ibfk_2` FOREIGN KEY (`szamla_azonosito`) REFERENCES `tranzakciok` (`szamla_azonosito`);

--
-- Megkötések a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD CONSTRAINT `ugyfelek_ibfk_1` FOREIGN KEY (`ugyfel_azonosito`) REFERENCES `hitelkartyak` (`ugyfel_azonosito`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
