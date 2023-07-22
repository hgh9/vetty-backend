-- -- MySQL dump 10.13  Distrib 5.7.42, for osx10.18 (x86_64)
-- --
-- -- Host: 127.0.0.1    Database: test
-- -- ------------------------------------------------------
-- -- Server version	5.5.5-10.11.4-MariaDB-1:10.11.4+maria~ubu2204

-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8 */;
-- /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
-- /*!40103 SET TIME_ZONE='+00:00' */;
-- /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
-- /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- --
-- -- Table structure for table `time_slot`
-- --

-- DROP TABLE IF EXISTS `time_slot`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `time_slot` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `startDate` date NOT NULL,
--   `time` int(11) NOT NULL,
--   `startTime` time NOT NULL,
--   `endTime` time NOT NULL,
--   `vetId` int(11) NOT NULL,
--   PRIMARY KEY (`id`),
--   KEY `FK_ab08ccac6a6e045894b7f193082` (`vetId`),
--   CONSTRAINT `FK_ab08ccac6a6e045894b7f193082` FOREIGN KEY (`vetId`) REFERENCES `vet` (`vetId`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `time_slot`
-- --

-- LOCK TABLES `time_slot` WRITE;
-- /*!40000 ALTER TABLE `time_slot` DISABLE KEYS */;
-- INSERT INTO `time_slot` VALUES (1,'2023-01-01',1,'00:00:00','01:00:00',1);
-- /*!40000 ALTER TABLE `time_slot` ENABLE KEYS */;
-- UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed on 2023-07-07 16:21:31
