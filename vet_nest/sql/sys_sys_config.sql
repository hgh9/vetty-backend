-- -- MySQL dump 10.13  Distrib 5.7.42, for osx10.18 (x86_64)
-- --
-- -- Host: 127.0.0.1    Database: sys
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
-- -- Table structure for table `sys_config`
-- --

-- DROP TABLE IF EXISTS `sys_config`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `sys_config` (
--   `variable` varchar(128) NOT NULL,
--   `value` varchar(128) DEFAULT NULL,
--   `set_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
--   `set_by` varchar(128) DEFAULT NULL,
--   PRIMARY KEY (`variable`)
-- ) ENGINE=Aria DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci PAGE_CHECKSUM=1;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `sys_config`
-- --

-- LOCK TABLES `sys_config` WRITE;
-- /*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
-- INSERT INTO `sys_config` VALUES ('statement_truncate_len','64','2023-07-07 07:02:14',NULL),('statement_performance_analyzer.limit','100','2023-07-07 07:02:14',NULL),('statement_performance_analyzer.view',NULL,'2023-07-07 07:02:14',NULL),('diagnostics.allow_i_s_tables','OFF','2023-07-07 07:02:14',NULL),('diagnostics.include_raw','OFF','2023-07-07 07:02:14',NULL),('ps_thread_trx_info.max_length','65535','2023-07-07 07:02:14',NULL);
-- /*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;
-- UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed on 2023-07-07 16:21:30
