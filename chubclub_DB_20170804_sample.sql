
-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: 68.178.143.42
-- Generation Time: Aug 04, 2017 at 09:58 AM
-- Server version: 5.5.43
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chubclub`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `ALL_PARTICIPANTS`
--
DROP VIEW IF EXISTS `ALL_PARTICIPANTS`;
CREATE TABLE IF NOT EXISTS `ALL_PARTICIPANTS` (
`ID` int(3) unsigned zerofill
,`NAME` varchar(30)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `GET_WEIGHINS`
--
DROP VIEW IF EXISTS `GET_WEIGHINS`;
CREATE TABLE IF NOT EXISTS `GET_WEIGHINS` (
`Id` int(10) unsigned zerofill
,`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
,`StartWeight` tinyint(1)
);
-- --------------------------------------------------------

--
-- Table structure for table `google_user`
--

DROP TABLE IF EXISTS `google_user`;
CREATE TABLE IF NOT EXISTS `google_user` (
  `google_id` decimal(21,0) NOT NULL,
  `google_name` varchar(60) NOT NULL,
  `google_email` varchar(60) NOT NULL,
  `google_link` varchar(60) NOT NULL,
  `google_picture_link` varchar(60) NOT NULL,
  PRIMARY KEY (`google_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `google_user`
--

INSERT INTO `google_user` VALUES(101010101010101010101, 'Chub User1', 'user@gmail.com', '', '');

-- --------------------------------------------------------

--
-- Stand-in structure for view `LATEST_WEIGH_IN`
--
DROP VIEW IF EXISTS `LATEST_WEIGH_IN`;
CREATE TABLE IF NOT EXISTS `LATEST_WEIGH_IN` (
`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
,`PARTICIPANT_ID` int(3) unsigned zerofill
,`BUDDY_ID` int(3) unsigned zerofill
);
-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `t` datetime DEFAULT NULL,
  `l` text,
  `e` text,
  KEY `t` (`t`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` VALUES('2016-02-22 19:24:50', '0', 'This is a test');

-- --------------------------------------------------------

--
-- Stand-in structure for view `MEASUREMENTS`
--
DROP VIEW IF EXISTS `MEASUREMENTS`;
CREATE TABLE IF NOT EXISTS `MEASUREMENTS` (
`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `MEASURE_WITH_FLAG`
--
DROP VIEW IF EXISTS `MEASURE_WITH_FLAG`;
CREATE TABLE IF NOT EXISTS `MEASURE_WITH_FLAG` (
`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
,`Official` tinyint(1)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `NO_ACCESS`
--
DROP VIEW IF EXISTS `NO_ACCESS`;
CREATE TABLE IF NOT EXISTS `NO_ACCESS` (
`id` int(11)
,`timestamp` datetime
,`usertype` int(11)
,`userid` decimal(21,0)
,`state` int(11)
,`google_id` decimal(21,0)
,`google_name` varchar(60)
,`google_email` varchar(60)
,`google_link` varchar(60)
,`google_picture_link` varchar(60)
);
-- --------------------------------------------------------

--
-- Table structure for table `PARTICIPANTS`
--

DROP TABLE IF EXISTS `PARTICIPANTS`;
CREATE TABLE IF NOT EXISTS `PARTICIPANTS` (
  `ID` int(3) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `NAME` varchar(30) NOT NULL,
  `EMAIL` varchar(120) NOT NULL,
  `HEIGHT` decimal(6,4) NOT NULL,
  `PAY_AMOUNT` decimal(6,0) NOT NULL,
  `PAY_METHOD` varchar(20) NOT NULL,
  `PAY_DATE` date NOT NULL,
  `AGE` int(2) NOT NULL,
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `PARTICIPANTS`
--

INSERT INTO `PARTICIPANTS` VALUES(001, 'Chub User1', 'user@gmail.com', 6.0000, 125, 'Google Wallet', '2017-04-05', 36);
INSERT INTO `PARTICIPANTS` VALUES(002, 'Chub User2', 'user@gmail.com', 6.0000, 125, 'PayPal', '2017-04-05', 35);
INSERT INTO `PARTICIPANTS` VALUES(003, 'Chub User3', 'user@gmail.com', 5.9167, 125, 'PayPal', '2017-04-11', 42);
INSERT INTO `PARTICIPANTS` VALUES(004, 'Chub User4', 'user@gmail.com', 5.6667, 125, 'Cash', '2017-04-11', 40);
INSERT INTO `PARTICIPANTS` VALUES(005, 'Chub User5', 'user@gmail.com', 5.7500, 125, 'Cash', '2017-04-05', 34);
INSERT INTO `PARTICIPANTS` VALUES(006, 'Chub User6', 'user@gmail.com', 6.0833, 125, 'Google Wallet', '2017-04-05', 36);
INSERT INTO `PARTICIPANTS` VALUES(007, 'Chub User7', 'user@gmail.com', 6.0000, 125, 'PayPal', '2017-04-11', 29);
INSERT INTO `PARTICIPANTS` VALUES(008, 'Chub User8', 'user@gmail.com', 5.8333, 125, 'Google Wallet', '2017-04-11', 31);
INSERT INTO `PARTICIPANTS` VALUES(009, 'Chub User9', 'user@gmail.com', 5.7500, 125, 'PayPal', '2017-04-08', 36);
INSERT INTO `PARTICIPANTS` VALUES(010, 'Chub User10', 'user@gmail.com', 6.1250, 125, 'PayPal', '2017-04-11', 36);
INSERT INTO `PARTICIPANTS` VALUES(011, 'Chub User11', 'user@gmail.com', 5.8333, 125, 'PayPal', '2017-04-11', 37);
INSERT INTO `PARTICIPANTS` VALUES(012, 'Chub User12', 'user@gmail.com', 5.7500, 125, 'PayPal', '2017-04-07', 33);
INSERT INTO `PARTICIPANTS` VALUES(013, 'Chub User13', 'user@gmail.com', 5.8333, 125, 'PayPal', '2017-04-06', 35);
INSERT INTO `PARTICIPANTS` VALUES(014, 'Chub User14', 'user@gmail.com', 5.6667, 125, 'Check', '2017-04-05', 23);
INSERT INTO `PARTICIPANTS` VALUES(015, 'Chub User15', 'user@gmail.com', 6.2083, 125, 'PayPal', '2017-04-08', 48);
INSERT INTO `PARTICIPANTS` VALUES(016, 'Chub User16', 'user@gmail.com', 5.8333, 125, 'PayPal', '2017-04-11', 39);
INSERT INTO `PARTICIPANTS` VALUES(017, 'Chub User17', 'user@gmail.com', 6.1042, 125, 'Cash', '2017-04-10', 38);
INSERT INTO `PARTICIPANTS` VALUES(018, 'Chub User18', 'user@gmail.com', 6.1667, 125, 'PayPal', '2017-04-08', 55);
INSERT INTO `PARTICIPANTS` VALUES(019, 'Chub User19', 'user@gmail.com', 5.8750, 125, 'Bank Transfer', '2017-04-08', 34);
INSERT INTO `PARTICIPANTS` VALUES(020, 'Chub User20', 'user@gmail.com', 5.9167, 125, 'PayPal', '2017-04-10', 46);
INSERT INTO `PARTICIPANTS` VALUES(021, 'Chub User21', 'user@gmail.com', 5.7500, 125, 'Cash', '2017-04-11', 39);
INSERT INTO `PARTICIPANTS` VALUES(022, 'Chub User22', 'user@gmail.com', 5.7500, 125, 'PayPal', '2017-04-07', 30);
INSERT INTO `PARTICIPANTS` VALUES(023, 'Chub User23', 'user@gmail.com', 5.6250, 125, 'Google Wallet', '2017-04-10', 29);
INSERT INTO `PARTICIPANTS` VALUES(024, 'Chub User24', 'user@gmail.com', 5.8333, 125, 'PayPal', '2017-04-18', 44);
INSERT INTO `PARTICIPANTS` VALUES(025, 'Chub User25', 'user@gmail.com', 5.9792, 125, 'PayPal', '2017-04-25', 49);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `userid` decimal(21,0) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` VALUES(3, '2017-04-28 08:44:50', 1, 101010101010101010101, 3);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE IF NOT EXISTS `setting` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `K` varchar(40) NOT NULL,
  `v` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=50 ;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` VALUES(37, 'dns.forwarder.ip', 'CLEANSED');
INSERT INTO `setting` VALUES(38, 'oauth2.google.clientId', 'CLEANSED');
INSERT INTO `setting` VALUES(39, 'oauth2.google.clientsecret', 'CLEANSED');
INSERT INTO `setting` VALUES(40, 'oauth2.google.devkey', 'CLEANSED');
INSERT INTO `setting` VALUES(41, 'oauth2.local.redirect', '../index.php');
INSERT INTO `setting` VALUES(49, 'registration.autoapprove', 'true');

-- --------------------------------------------------------

--
-- Stand-in structure for view `START_WEIGHTS`
--
DROP VIEW IF EXISTS `START_WEIGHTS`;
CREATE TABLE IF NOT EXISTS `START_WEIGHTS` (
`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `UNOFFICIAL`
--
DROP VIEW IF EXISTS `UNOFFICIAL`;
CREATE TABLE IF NOT EXISTS `UNOFFICIAL` (
`Date` date
,`Time` time
,`Participant` varchar(30)
,`BodyFat` decimal(4,3)
,`Weight` decimal(4,1)
,`Viseral` int(2)
,`Waist` decimal(6,4)
,`Height` decimal(6,4)
,`Age` int(2)
,`Tool` text
,`Buddy` varchar(30)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `USER_ACCESS`
--
DROP VIEW IF EXISTS `USER_ACCESS`;
CREATE TABLE IF NOT EXISTS `USER_ACCESS` (
`google_name` varchar(60)
,`google_email` varchar(60)
,`state` int(11)
,`id` int(11)
);
-- --------------------------------------------------------

--
-- Table structure for table `WEIGH_IN`
--

DROP TABLE IF EXISTS `WEIGH_IN`;
CREATE TABLE IF NOT EXISTS `WEIGH_IN` (
  `ID` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `DATE` date NOT NULL,
  `TIME` time NOT NULL,
  `TOOL` text NOT NULL,
  `PARTICIPANT_ID` int(3) unsigned zerofill NOT NULL,
  `BUDDY_ID` int(3) unsigned zerofill NOT NULL,
  `WEIGHT` decimal(4,1) NOT NULL,
  `BODYFAT` decimal(4,3) NOT NULL,
  `VISERAL` int(2) NOT NULL,
  `WAIST` decimal(6,4) NOT NULL,
  `START_WEIGHT` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

--
-- Dumping data for table `WEIGH_IN`
--

INSERT INTO `WEIGH_IN` VALUES(0000000001, '2017-04-11', '12:05:00', 'Klee Scale', 001, 002, 230.6, 0.314, 14, 43.2500, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000002, '2017-04-06', '15:47:00', 'Klee Scale', 002, 007, 232.0, 0.331, 14, 45.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000003, '2017-04-11', '12:36:00', 'Klee Scale', 003, 008, 219.8, 0.257, 13, 41.5000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000004, '2017-04-11', '14:00:00', 'Klee Scale', 004, 005, 203.0, 0.300, 14, 38.5000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000005, '2017-04-12', '10:27:00', 'Klee Scale', 005, 006, 243.6, 0.356, 17, 43.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000006, '2017-04-07', '14:10:00', 'Klee Scale', 006, 007, 275.0, 0.370, 18, 45.5000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000007, '2017-04-06', '17:30:00', 'Klee Scale', 007, 009, 180.6, 0.224, 7, 35.1250, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000008, '2017-04-11', '12:30:00', 'Klee Scale', 008, 017, 210.6, 0.321, 12, 40.8750, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000009, '2017-04-06', '17:00:00', 'Klee Scale', 009, 007, 171.4, 0.264, 8, 37.5000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000010, '2017-04-11', '10:00:00', 'Klee Scale', 010, 014, 217.4, 0.257, 11, 38.1250, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000011, '2017-04-11', '13:26:00', 'Klee Scale', 011, 001, 234.0, 0.352, 16, 45.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000012, '2017-04-09', '16:07:00', 'Klee Scale', 012, 006, 228.4, 0.344, 16, 41.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000013, '2017-04-10', '16:30:00', 'Klee Scale', 013, 012, 206.8, 0.236, 12, 37.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000014, '2017-04-07', '14:57:00', 'Klee Scale', 014, 001, 167.8, 0.371, 5, 32.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000015, '2017-04-12', '11:58:00', 'Iveto Handheld', 015, 021, 365.0, 0.398, 0, 50.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000016, '2017-04-10', '15:24:00', 'Klee Scale', 016, 002, 197.2, 0.264, 14, 39.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000017, '2017-04-11', '12:30:00', 'Klee Scale', 017, 008, 238.2, 0.275, 13, 41.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000018, '2017-04-10', '16:15:00', 'Klee Scale', 018, 001, 206.6, 0.211, 10, 42.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000019, '2017-04-11', '13:29:00', 'Klee Scale', 019, 001, 192.2, 0.263, 9, 36.2500, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000020, '2017-04-10', '11:58:00', 'Klee Scale', 020, 005, 218.0, 0.329, 15, 43.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000021, '2017-04-12', '12:00:00', 'Iveto Handheld', 021, 015, 375.0, 0.435, 0, 52.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000022, '2017-04-10', '11:56:00', 'Klee Scale', 022, 005, 181.8, 0.265, 9, 37.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000023, '2017-04-09', '15:40:00', 'Klee Scale', 023, 019, 183.2, 0.244, 10, 35.5000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000024, '2017-04-18', '13:00:00', 'Klees Scale', 024, 006, 233.8, 0.367, 18, 44.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000025, '2017-04-25', '15:10:00', 'Klees Scale', 025, 006, 215.2, 0.322, 14, 0.0000, 1);
INSERT INTO `WEIGH_IN` VALUES(0000000028, '2017-04-17', '14:48:00', 'Klees Scale', 005, 007, 244.4, 0.344, 17, 43.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000029, '2017-04-17', '14:40:00', 'Klees Scale', 009, 007, 168.0, 0.257, 0, 37.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000030, '2017-04-18', '13:14:00', 'Klees Scale', 019, 007, 192.2, 0.235, 9, 36.3750, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000031, '2017-04-18', '15:05:00', 'Klees Scale', 006, 007, 271.0, 0.348, 17, 44.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000032, '2017-04-18', '15:20:00', 'Klees Scale', 017, 017, 234.4, 0.303, 13, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000033, '2017-04-20', '13:33:00', 'Klees Scale', 019, 009, 190.4, 0.239, 9, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000035, '2017-04-21', '15:56:00', 'Klees Scale', 005, 001, 244.6, 0.354, 18, 45.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000036, '2017-04-26', '13:27:00', 'Klees Scale', 008, 005, 206.2, 0.319, 12, 40.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000037, '2017-04-26', '13:27:00', 'Klees Scale', 009, 009, 167.0, 0.246, 8, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000038, '2017-04-27', '09:38:00', 'Klees Scale', 005, 007, 237.0, 0.332, 17, 46.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000039, '2017-04-27', '12:00:00', 'Klees Scale', 012, 012, 223.0, 0.340, 15, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000040, '2017-05-01', '09:15:00', 'Klees Scale', 020, 005, 214.0, 0.320, 14, 43.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000041, '2017-05-05', '09:00:00', 'Klees Scale', 005, 007, 235.6, 0.331, 16, 41.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000042, '2017-05-08', '16:24:00', 'Klees Scale', 019, 002, 185.8, 0.244, 8, 35.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000044, '2017-05-09', '12:58:00', 'Klees Scale', 006, 019, 261.0, 0.336, 16, 43.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000045, '2017-05-09', '13:04:00', 'Klees Scale', 019, 006, 187.0, 0.248, 9, 35.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000046, '2017-05-09', '13:22:00', 'Klees Scale', 005, 007, 237.0, 0.335, 17, 41.2500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000047, '2017-05-09', '13:20:00', 'Klees Scale', 001, 006, 217.0, 0.276, 12, 40.7500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000049, '2017-05-09', '13:50:00', 'Klees Scale', 012, 012, 224.6, 0.324, 15, 41.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000051, '2017-05-10', '08:57:00', 'Klees Scale', 009, 007, 164.2, 0.242, 7, 36.2500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000052, '2017-05-11', '14:58:00', 'Klees Scale', 002, 007, 215.8, 0.297, 11, 40.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000053, '2017-05-10', '09:01:00', 'Klees Scale', 016, 016, 187.4, 0.250, 10, 36.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000054, '2017-05-12', '15:24:00', 'Klees Scale', 019, 019, 187.6, 0.249, 9, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000056, '2017-05-09', '14:05:00', 'Klees Scale', 017, 008, 228.4, 0.273, 12, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000057, '2017-05-09', '14:05:00', 'Klees Scale', 008, 017, 209.6, 0.312, 12, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000058, '2017-05-20', '18:19:00', 'Klees Scale', 023, 023, 181.0, 0.240, 10, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000061, '2017-05-26', '08:52:00', 'Klees Scale', 010, 010, 220.0, 0.244, 11, 36.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000063, '2017-05-26', '12:04:00', 'Klees Scale', 023, 023, 179.6, 0.217, 0, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000064, '2017-05-30', '12:33:00', 'Klees Scale', 019, 019, 184.8, 0.223, 8, 35.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000065, '2017-05-18', '09:30:00', 'Klees Scale', 007, 009, 172.4, 0.168, 5, 31.6250, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000066, '2017-05-24', '09:30:00', 'Klees Scale', 016, 007, 186.4, 0.252, 10, 37.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000067, '2017-05-24', '09:30:00', 'Klees Scale', 017, 007, 225.2, 0.273, 12, 39.1250, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000068, '2017-05-18', '14:54:00', 'Klees Scale', 014, 007, 165.6, 0.364, 4, 30.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000069, '2017-05-24', '17:50:00', 'Klees Scale', 002, 007, 213.0, 0.293, 11, 39.2500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000070, '2017-05-30', '13:00:00', 'Klees Scale', 001, 001, 211.8, 0.257, 11, 40.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000071, '2017-04-24', '17:13:00', 'Klees Scale', 007, 007, 175.4, 0.185, 6, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000072, '2017-05-04', '17:14:00', 'Klees Scale', 007, 007, 172.4, 0.189, 6, 32.7500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000073, '2017-05-22', '17:15:00', 'Klees Scale', 007, 007, 173.8, 0.151, 5, 31.6250, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000074, '2017-06-01', '10:34:00', 'Klees Scale', 019, 019, 184.2, 0.204, 8, 35.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000075, '2017-06-02', '12:47:00', 'Klees Scale', 005, 002, 238.4, 0.315, 16, 42.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000076, '2017-06-02', '13:41:00', 'Klees Scale', 002, 007, 214.8, 0.287, 11, 39.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000077, '2017-06-06', '10:33:00', 'Klees Scale', 019, 019, 182.2, 0.201, 8, 34.8750, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000078, '2017-06-07', '14:57:00', 'Klees Scale', 019, 019, 179.2, 0.195, 7, 35.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000079, '2017-06-09', '10:07:00', 'Klees Scale', 019, 019, 179.2, 0.196, 7, 34.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000080, '2017-06-01', '12:00:00', 'Klees Scale', 008, 008, 206.2, 0.310, 12, 39.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000081, '2017-05-24', '13:48:00', 'Klees Scale', 019, 019, 184.8, 0.242, 8, 35.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000082, '2017-05-23', '13:18:00', 'Klees Scale', 017, 007, 222.8, 0.283, 12, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000083, '2017-06-08', '17:45:00', 'Klees Scale', 005, 002, 237.8, 0.340, 17, 42.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000084, '2017-06-10', '19:08:00', 'Klees Scale', 023, 023, 181.6, 0.232, 10, 0.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000085, '2017-06-13', '09:40:00', 'Klees Scale', 002, 007, 209.4, 0.272, 11, 39.2500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000086, '2017-06-14', '11:18:00', 'Klees Scale', 019, 019, 175.0, 0.190, 7, 34.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000087, '2017-06-15', '17:13:00', 'Klees Scale', 001, 006, 211.2, 0.260, 11, 39.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000088, '2017-06-15', '17:15:00', 'Klees Scale', 006, 001, 252.2, 0.339, 15, 41.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000089, '2017-06-16', '10:00:00', 'Klees Scale', 019, 019, 174.2, 0.198, 7, 34.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000090, '2017-06-21', '12:40:00', 'Klees Scale', 019, 019, 175.8, 0.184, 7, 34.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000091, '2017-06-21', '13:05:00', 'Klees Scale', 007, 007, 171.4, 0.166, 5, 31.7500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000092, '2017-06-22', '11:33:00', 'Klees Scale', 009, 007, 165.8, 0.241, 7, 37.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000093, '2017-06-26', '15:53:00', 'Klees Scale', 017, 008, 221.2, 0.245, 11, 38.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000094, '2017-06-29', '14:30:00', 'Klees Scale', 017, 017, 214.4, 0.229, 11, 37.6250, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000095, '2017-07-10', '11:08:00', 'Klees Scale', 008, 017, 204.4, 0.298, 11, 39.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000096, '2017-07-11', '14:30:00', 'Klees Scale', 017, 017, 213.2, 0.248, 10, 38.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000097, '2017-07-19', '12:52:00', 'Klees Scale', 014, 008, 164.0, 0.273, 7, 30.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000098, '2017-07-19', '12:54:00', 'Klees Scale', 008, 014, 205.0, 0.296, 12, 39.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000099, '2017-06-28', '15:55:00', 'Klees Scale', 019, 019, 179.4, 0.197, 7, 34.0000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000100, '2017-08-02', '13:00:00', 'Klees Scale', 019, 019, 182.0, 0.210, 8, 35.2500, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000101, '2017-06-22', '15:30:00', 'Klees Scale', 002, 009, 209.6, 0.260, 10, 39.5000, 0);
INSERT INTO `WEIGH_IN` VALUES(0000000102, '2017-08-03', '16:45:00', 'Klees Scale', 017, 017, 215.8, 0.244, 11, 38.0000, 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `WITH_ACCESS`
--
DROP VIEW IF EXISTS `WITH_ACCESS`;
CREATE TABLE IF NOT EXISTS `WITH_ACCESS` (
`id` int(11)
,`timestamp` datetime
,`usertype` int(11)
,`userid` decimal(21,0)
,`state` int(11)
,`google_id` decimal(21,0)
,`google_name` varchar(60)
,`google_email` varchar(60)
,`google_link` varchar(60)
,`google_picture_link` varchar(60)
);
-- --------------------------------------------------------

--
-- Structure for view `ALL_PARTICIPANTS`
--
DROP TABLE IF EXISTS `ALL_PARTICIPANTS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`ALL_PARTICIPANTS` AS select `chubclub`.`PARTICIPANTS`.`ID` AS `ID`,`chubclub`.`PARTICIPANTS`.`NAME` AS `NAME` from `chubclub`.`PARTICIPANTS`;

-- --------------------------------------------------------

--
-- Structure for view `GET_WEIGHINS`
--
DROP TABLE IF EXISTS `GET_WEIGHINS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`GET_WEIGHINS` AS select `weighin`.`ID` AS `Id`,`weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy`,`weighin`.`START_WEIGHT` AS `StartWeight` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`)));

-- --------------------------------------------------------

--
-- Structure for view `LATEST_WEIGH_IN`
--
DROP TABLE IF EXISTS `LATEST_WEIGH_IN`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`LATEST_WEIGH_IN` AS select `weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy`,`weighin`.`PARTICIPANT_ID` AS `PARTICIPANT_ID`,`weighin`.`BUDDY_ID` AS `BUDDY_ID` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`))) where (`weighin`.`DATE` = (select max(`chubclub`.`WEIGH_IN`.`DATE`) from `chubclub`.`WEIGH_IN` where (`weighin`.`PARTICIPANT_ID` = `chubclub`.`WEIGH_IN`.`PARTICIPANT_ID`))) order by `weighin`.`DATE` desc;

-- --------------------------------------------------------

--
-- Structure for view `MEASUREMENTS`
--
DROP TABLE IF EXISTS `MEASUREMENTS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`MEASUREMENTS` AS select `weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`)));

-- --------------------------------------------------------

--
-- Structure for view `MEASURE_WITH_FLAG`
--
DROP TABLE IF EXISTS `MEASURE_WITH_FLAG`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`MEASURE_WITH_FLAG` AS select `weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy`,`weighin`.`START_WEIGHT` AS `Official` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`)));

-- --------------------------------------------------------

--
-- Structure for view `NO_ACCESS`
--
DROP TABLE IF EXISTS `NO_ACCESS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`NO_ACCESS` AS select `chubclub`.`permission`.`id` AS `id`,`chubclub`.`permission`.`timestamp` AS `timestamp`,`chubclub`.`permission`.`usertype` AS `usertype`,`chubclub`.`permission`.`userid` AS `userid`,`chubclub`.`permission`.`state` AS `state`,`chubclub`.`google_user`.`google_id` AS `google_id`,`chubclub`.`google_user`.`google_name` AS `google_name`,`chubclub`.`google_user`.`google_email` AS `google_email`,`chubclub`.`google_user`.`google_link` AS `google_link`,`chubclub`.`google_user`.`google_picture_link` AS `google_picture_link` from (`chubclub`.`permission` join `chubclub`.`google_user` on((`chubclub`.`google_user`.`google_id` = `chubclub`.`permission`.`userid`))) where (`chubclub`.`permission`.`state` = 0);

-- --------------------------------------------------------

--
-- Structure for view `START_WEIGHTS`
--
DROP TABLE IF EXISTS `START_WEIGHTS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`START_WEIGHTS` AS select `weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`))) where (`weighin`.`START_WEIGHT` = 1);

-- --------------------------------------------------------

--
-- Structure for view `UNOFFICIAL`
--
DROP TABLE IF EXISTS `UNOFFICIAL`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`UNOFFICIAL` AS select `weighin`.`DATE` AS `Date`,`weighin`.`TIME` AS `Time`,`part`.`NAME` AS `Participant`,`weighin`.`BODYFAT` AS `BodyFat`,`weighin`.`WEIGHT` AS `Weight`,`weighin`.`VISERAL` AS `Viseral`,`weighin`.`WAIST` AS `Waist`,`part`.`HEIGHT` AS `Height`,`part`.`AGE` AS `Age`,`weighin`.`TOOL` AS `Tool`,`buddy`.`NAME` AS `Buddy` from ((`chubclub`.`WEIGH_IN` `weighin` join `chubclub`.`PARTICIPANTS` `part` on((`weighin`.`PARTICIPANT_ID` = `part`.`ID`))) join `chubclub`.`PARTICIPANTS` `buddy` on((`weighin`.`BUDDY_ID` = `buddy`.`ID`))) where (`weighin`.`START_WEIGHT` = 0);

-- --------------------------------------------------------

--
-- Structure for view `USER_ACCESS`
--
DROP TABLE IF EXISTS `USER_ACCESS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`USER_ACCESS` AS select `chubclub`.`google_user`.`google_name` AS `google_name`,`chubclub`.`google_user`.`google_email` AS `google_email`,`chubclub`.`permission`.`state` AS `state`,`chubclub`.`permission`.`id` AS `id` from (`chubclub`.`google_user` join `chubclub`.`permission` on((`chubclub`.`permission`.`userid` = `chubclub`.`google_user`.`google_id`)));

-- --------------------------------------------------------

--
-- Structure for view `WITH_ACCESS`
--
DROP TABLE IF EXISTS `WITH_ACCESS`;

CREATE ALGORITHM=UNDEFINED DEFINER=`chubclub`@`%` SQL SECURITY DEFINER VIEW `chubclub`.`WITH_ACCESS` AS select `chubclub`.`permission`.`id` AS `id`,`chubclub`.`permission`.`timestamp` AS `timestamp`,`chubclub`.`permission`.`usertype` AS `usertype`,`chubclub`.`permission`.`userid` AS `userid`,`chubclub`.`permission`.`state` AS `state`,`chubclub`.`google_user`.`google_id` AS `google_id`,`chubclub`.`google_user`.`google_name` AS `google_name`,`chubclub`.`google_user`.`google_email` AS `google_email`,`chubclub`.`google_user`.`google_link` AS `google_link`,`chubclub`.`google_user`.`google_picture_link` AS `google_picture_link` from (`chubclub`.`permission` join `chubclub`.`google_user` on((`chubclub`.`google_user`.`google_id` = `chubclub`.`permission`.`userid`))) where (`chubclub`.`permission`.`state` = 2);
