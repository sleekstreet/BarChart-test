# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: stockQuotes
# Generation Time: 2017-11-27 04:51:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table quotes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `quotes`;

CREATE TABLE `quotes` (
  `symbol` varchar(18) NOT NULL,
  `name` varchar(128) NOT NULL,
  `last` double DEFAULT NULL,
  `change` double DEFAULT NULL,
  `pctchange` double DEFAULT NULL,
  `volume` int(11) DEFAULT NULL,
  `tradetime` datetime DEFAULT NULL,
  PRIMARY KEY (`symbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;

INSERT INTO `quotes` (`symbol`, `name`, `last`, `change`, `pctchange`, `volume`, `tradetime`)
VALUES
	('AAPL','Apple Inc',145.42,-3.56,-2.39,72219195,'2017-06-12 18:03:00'),
	('AMD','Adv Micro Devices',12.09,-0.19,-1.55,125643297,'2017-06-12 18:04:00'),
	('AMZN','Amazon.Com Inc',964.91,-13.4,-1.37,9438600,'2017-06-12 18:03:00'),
	('CSCO','Cisco Systems Inc',31.25,-0.12,-0.38,25783400,'2017-06-12 18:02:00'),
	('EA','Electronic Arts Inc',108.9,-1.56,-1.41,5822000,'2017-06-12 18:00:00'),
	('F','Ford Motor Company',11.28,0.15,1.35,38472102,'2017-06-12 17:53:00'),
	('FB','Facebook Inc',148.44,-1.16,-0.78,33152699,'2017-06-12 18:00:00'),
	('GE','General Electric Company',28.94,1,3.58,139003297,'2017-06-12 18:04:00'),
	('GM','General Motors Company',34.68,0.34,0.99,14304899,'2017-06-12 17:06:00'),
	('GOOGL','Alphabet Class A',961.81,-8.31,-0.86,4198000,'2017-06-12 18:04:00'),
	('IBM','International Business Machines',155.18,1.08,0.7,6464800,'2017-06-12 17:47:00'),
	('NVDA','Nvidia Corporation',149.97,0.37,0.25,42311801,'2017-06-12 18:04:00'),
	('P','Pandora Media Inc',7.87,-0.65,-7.63,31016299,'2017-06-12 17:50:00'),
	('SNAP','Snap Inc',18.2,0.12,0.66,16160100,'2017-06-12 18:02:00'),
	('T','AT&T Inc',39.07,0.28,0.72,22779799,'2017-06-12 17:41:00'),
	('TSLA','Tesla Inc',359.01,1.69,0.47,10508800,'2017-06-12 18:02:00'),
	('TWTR','Twitter Inc',17.04,0.14,0.83,20490801,'2017-06-12 18:03:00'),
	('V','Visa Inc',93.5,-1.06,-1.12,15604300,'2017-06-12 17:48:00'),
	('VZ','Verizon Communications Inc',47.19,0.47,1.01,18929000,'2017-06-12 17:59:00'),
	('YHOO','Yahoo! Inc',53.12,-0.9,-1.67,57719301,'2017-06-12 17:39:00');

/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  `crypt` varchar(255) DEFAULT NULL,
  `AAPL` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `AMD` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `AMZN` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `CSCO` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `EA` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `F` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `FB` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `GE` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `GM` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `GOOGL` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `IBM` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `NVDA` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `P` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `SNAP` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `T` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `TSLA` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `TWTR` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `V` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `VZ` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  `YHOO` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `crypt`, `AAPL`, `AMD`, `AMZN`, `CSCO`, `EA`, `F`, `FB`, `GE`, `GM`, `GOOGL`, `IBM`, `NVDA`, `P`, `SNAP`, `T`, `TSLA`, `TWTR`, `V`, `VZ`, `YHOO`)
VALUES
	(1,'nate','Erupt!0n$4f','$2y$10$yZHUGQ3KXnlf3HuvUNY4vuUSPjQS2NOnnoINCuPXDax3sEKQBMaIi',0,0,0,0,0,1,1,0,1,0,1,0,0,1,1,0,0,1,1,0);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
