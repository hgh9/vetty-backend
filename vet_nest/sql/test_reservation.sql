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
-- -- Table structure for table `reservation`
-- --

-- DROP TABLE IF EXISTS `reservation`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `reservation` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `receptionMethod` varchar(255) NOT NULL,
--   `status` int(11) NOT NULL,
--   `reservedAt` datetime NOT NULL,
--   `vetId` int(11) NOT NULL,
--   `slotId` int(11) NOT NULL,
--   `petId` varchar(255) NOT NULL,
--   `userId` int(11) NOT NULL,
--   `treatmentStatus` int(11) NOT NULL,
--   `amount` decimal(10,0) NOT NULL,
--   `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
--   `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
--   PRIMARY KEY (`id`),
--   KEY `FK_b6c4978d84defc41e95060ea984` (`slotId`),
--   KEY `FK_c43f77bf708ff18927262b4aa3c` (`petId`),
--   KEY `FK_ff5e6fe44e3f446ba17733042d0` (`vetId`),
--   KEY `FK_529dceb01ef681127fef04d755d` (`userId`),
--   CONSTRAINT `FK_529dceb01ef681127fef04d755d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FK_b6c4978d84defc41e95060ea984` FOREIGN KEY (`slotId`) REFERENCES `time_slot` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FK_c43f77bf708ff18927262b4aa3c` FOREIGN KEY (`petId`) REFERENCES `pet` (`petId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FK_ff5e6fe44e3f446ba17733042d0` FOREIGN KEY (`vetId`) REFERENCES `vet` (`vetId`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `reservation`
-- --

-- LOCK TABLES `reservation` WRITE;
-- /*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
-- INSERT INTO `reservation` VALUES (1,'R',1,'2023-07-07 08:45:08',1,1,'263df66a-c1e0-4ad3-94e7-bf8236ec3f09',1,1,10000,'2023-07-07 16:02:41.882550','2023-07-07 16:15:08.000000'),(2,'R',1,'2023-07-07 07:45:08',1,1,'263df66a-c1e0-4ad3-94e7-bf8236ec3f09',1,1,10000,'2023-07-07 16:02:41.882550','2023-07-07 16:15:08.000000'),(3,'R',1,'2023-07-07 08:45:08',1,1,'263df66a-c1e0-4ad3-94e7-bf8236ec3f09',1,-1,10000,'2023-07-07 16:02:41.882550','2023-07-07 16:15:08.000000');
-- /*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
-- UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed on 2023-07-07 16:21:32
