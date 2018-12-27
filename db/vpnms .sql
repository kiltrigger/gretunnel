SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `vpnms`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bandwidth`
--

CREATE TABLE IF NOT EXISTS `bandwidth` (
  `bw_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bandwidth_name` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`bw_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

INSERT INTO `bandwidth` (`bw_id`, `bandwidth_name`) VALUES
(1, 'bw-unlim'),
(2, 'bw-256'),
(3, 'bw-512'),
(4, 'bw-1024'),
(5, 'bw-1536'),
(6, 'bw-2048'),
(7, 'bw-3072'),
(8, 'bw-4096'),
(9, 'bw-5120');

-- --------------------------------------------------------

--
-- Структура таблицы `flows`
--

CREATE TABLE IF NOT EXISTS `flows` (
  `TimeStamp` int(10) unsigned NOT NULL,
  `Owner` varchar(50) COLLATE utf8_bin NOT NULL,
  `SrcIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `SrcPort` int(10) unsigned NOT NULL,
  `DstIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `DstPort` int(10) unsigned NOT NULL,
  `Bytes` bigint(20) NOT NULL,
  `Local` tinyint(1) NOT NULL,
  KEY `Owner` (`Owner`),
  KEY `TimeStamp` (`TimeStamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `flows_archive`
--

CREATE TABLE IF NOT EXISTS `flows_archive` (
  `TimeStamp` int(10) unsigned NOT NULL,
  `Owner` varchar(50) COLLATE utf8_bin NOT NULL,
  `SrcIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `SrcPort` int(10) unsigned NOT NULL,
  `DstIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `DstPort` int(10) unsigned NOT NULL,
  `Bytes` bigint(20) NOT NULL,
  `Local` tinyint(1) NOT NULL,
  KEY `Owner` (`Owner`),
  KEY `TimeStamp` (`TimeStamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `flows_tmp`
--

CREATE TABLE IF NOT EXISTS `flows_tmp` (
  `TimeStamp` int(10) unsigned NOT NULL,
  `Owner` varchar(50) COLLATE utf8_bin NOT NULL,
  `SrcIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `SrcPort` int(10) unsigned NOT NULL,
  `DstIp` varchar(15) COLLATE utf8_bin NOT NULL,
  `DstPort` int(10) unsigned NOT NULL,
  `Bytes` bigint(20) NOT NULL,
  `Local` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `hourlystat`
--

CREATE TABLE IF NOT EXISTS `hourlystat` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `timestamp` int(10) NOT NULL,
  `owner` varchar(150) COLLATE utf8_bin NOT NULL DEFAULT '',
  `HTTP` bigint(21) NOT NULL DEFAULT '0',
  `HTTPS` bigint(21) NOT NULL DEFAULT '0',
  `SSH` bigint(21) NOT NULL DEFAULT '0',
  `ICQ` bigint(21) NOT NULL DEFAULT '0',
  `SMTP` bigint(21) NOT NULL DEFAULT '0',
  `SSMTP` bigint(21) NOT NULL DEFAULT '0',
  `POP3` bigint(21) NOT NULL DEFAULT '0',
  `POP3S` bigint(21) NOT NULL DEFAULT '0',
  `IMAP` bigint(21) NOT NULL DEFAULT '0',
  `IMAPS` bigint(21) NOT NULL DEFAULT '0',
  `IMAPSSL` bigint(21) NOT NULL DEFAULT '0',
  `DNS` bigint(21) NOT NULL DEFAULT '0',
  `other` bigint(21) NOT NULL DEFAULT '0',
  `all` bigint(21) NOT NULL DEFAULT '0',
  `direction` enum('input','output') COLLATE utf8_bin NOT NULL,
  `local` tinyint(1) NOT NULL,
  `rotation` enum('1','2','3') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `timestamp` (`timestamp`),
  KEY `owner` (`owner`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `radcheck`
--

CREATE TABLE IF NOT EXISTS `radcheck` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `attribute` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `op` char(2) COLLATE utf8_bin NOT NULL DEFAULT '==',
  `value` varchar(253) COLLATE utf8_bin NOT NULL DEFAULT '',
  `name` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `allow_tcp_port` text COLLATE utf8_bin NOT NULL,
  `allow_udp_port` text COLLATE utf8_bin NOT NULL,
  `limit` bigint(20) NOT NULL DEFAULT '0',
  `out_limit` int(3) NOT NULL DEFAULT '20',
  `bandwidth` int(10) unsigned DEFAULT NULL,
  `limit_type` enum('limited','unlimited') COLLATE utf8_bin NOT NULL DEFAULT 'limited',
  `status` enum('working','blocked','limit_expire','local_only','deleted') COLLATE utf8_bin NOT NULL DEFAULT 'working',
  `bonus` bigint(20) NOT NULL DEFAULT '0',
  `admin` char(1) COLLATE utf8_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `username` (`username`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2 ;


INSERT INTO `radcheck` (`id`, `username`, `attribute`, `op`, `value`, `name`, `lastname`, `allow_tcp_port`, `allow_udp_port`, `limit`, `out_limit`, `bandwidth`, `limit_type`, `status`, `bonus`, `admin`) VALUES
(1, 'admin', 'Cleartext-Password', ':=', 'passwd', '', '', '{ 80 3128 }', '{ 53 }', 20971520, 20, 3, 'limited', 'limit_expire', 0, '1');


-- --------------------------------------------------------

--
-- Структура таблицы `radgroupcheck`
--

CREATE TABLE IF NOT EXISTS `radgroupcheck` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `attribute` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `op` char(2) COLLATE utf8_bin NOT NULL DEFAULT '==',
  `value` varchar(253) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `groupname` (`groupname`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `radgroupreply`
--

CREATE TABLE IF NOT EXISTS `radgroupreply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `attribute` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `op` char(2) COLLATE utf8_bin NOT NULL DEFAULT '=',
  `value` varchar(253) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `groupname` (`groupname`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

INSERT INTO `radgroupreply` (`id`, `groupname`, `attribute`, `op`, `value`) VALUES
(1, 'users', 'Framed-Protocol', ':=', 'PPP'),
(2, 'users', 'Framed-IP-Netmask', ':=', '255.255.255.255');

-- --------------------------------------------------------

--
-- Структура таблицы `radpostauth`
--

CREATE TABLE IF NOT EXISTS `radpostauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pass` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `reply` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `authdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `radreply`
--

CREATE TABLE IF NOT EXISTS `radreply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `attribute` varchar(32) COLLATE utf8_bin NOT NULL DEFAULT '',
  `op` char(2) COLLATE utf8_bin NOT NULL DEFAULT '=',
  `value` varchar(253) COLLATE utf8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `username` (`username`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2 ;

INSERT INTO `radreply` (`id`, `username`, `attribute`, `op`, `value`) VALUES
(1, 'test', 'Framed-IP-Address', ':=', '10.3.0.2');

-- --------------------------------------------------------

--
-- Структура таблицы `radusergroup`
--

CREATE TABLE IF NOT EXISTS `radusergroup` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `groupname` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `priority` int(11) NOT NULL DEFAULT '1',
  KEY `username` (`username`(32))
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `radusergroup` (`username`, `groupname`, `priority`) VALUES
('admin', 'users', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `SessId` bigint(21) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `StartTime` bigint(30) NOT NULL DEFAULT '0',
  `StopTime` bigint(30) NOT NULL DEFAULT '0',
  `SessionTime` bigint(10) NOT NULL DEFAULT '0',
  `InternetIn` bigint(14) NOT NULL DEFAULT '0',
  `InternetOut` bigint(14) NOT NULL DEFAULT '0',
  `LocalIn` bigint(14) NOT NULL DEFAULT '0',
  `LocalOut` bigint(14) NOT NULL DEFAULT '0',
  `CallingStationId` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `FramedIpAddress` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '',
  `Interface` varchar(7) COLLATE utf8_bin NOT NULL DEFAULT '',
  `Connected` char(2) COLLATE utf8_bin NOT NULL DEFAULT '',
  `Speed_in` bigint(21) NOT NULL DEFAULT '0',
  `Speed_out` bigint(21) NOT NULL DEFAULT '0',
  `Rotation` enum('1','2','3') COLLATE utf8_bin NOT NULL DEFAULT '1',
  PRIMARY KEY (`SessId`),
  KEY `UserName` (`UserName`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `subnets`
--

CREATE TABLE IF NOT EXISTS `subnets` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `Subnet_Address` varchar(15) COLLATE utf8_bin NOT NULL DEFAULT '',
  `NetMask` varchar(15) COLLATE utf8_bin NOT NULL,
  `Masklength` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `vpnmsgroupreply`
--

CREATE TABLE IF NOT EXISTS `vpnmsgroupreply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `allow_tcp_port` text COLLATE utf8_bin NOT NULL,
  `allow_udp_port` text COLLATE utf8_bin NOT NULL,
  `limit` bigint(20) NOT NULL DEFAULT '0',
  `out_limit` int(3) NOT NULL DEFAULT '20',
  `bandwidth` int(10) unsigned DEFAULT NULL,
  `limit_type` enum('limited','unlimited') COLLATE utf8_bin NOT NULL DEFAULT 'limited',
  `status` enum('working','blocked','local_only') COLLATE utf8_bin NOT NULL DEFAULT 'working',
  PRIMARY KEY (`id`),
  KEY `username` (`groupname`(32))
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2 ;

INSERT INTO `vpnmsgroupreply` (`id`, `groupname`, `allow_tcp_port`, `allow_udp_port`, `limit`, `out_limit`, `bandwidth`, `limit_type`, `status`) VALUES
(1, 'users', '{ 80 3128 }', '{ 53 }', 20971520, 20, 3, 'limited', 'working');


