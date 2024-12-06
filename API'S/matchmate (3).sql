-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 05:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matchmate`
--

-- --------------------------------------------------------

--
-- Table structure for table `batsmanballbystats`
--

CREATE TABLE `batsmanballbystats` (
  `id` int(11) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `t_id` int(11) DEFAULT NULL,
  `batsman_name` varchar(255) NOT NULL,
  `ball_number` int(11) NOT NULL,
  `over_number` int(11) NOT NULL,
  `runs_scored` int(11) DEFAULT 0,
  `ball_runs` text DEFAULT NULL,
  `sixes` int(50) DEFAULT 0,
  `fours` int(50) NOT NULL DEFAULT 0,
  `wicket_type` varchar(50) DEFAULT 'Not Out',
  `dismissed` tinyint(1) DEFAULT 0,
  `strike_rate` float NOT NULL DEFAULT 0,
  `match_date` date NOT NULL DEFAULT current_timestamp(),
  `innings` int(11) DEFAULT 1,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batsmanballbystats`
--

INSERT INTO `batsmanballbystats` (`id`, `m_id`, `t_id`, `batsman_name`, `ball_number`, `over_number`, `runs_scored`, `ball_runs`, `sixes`, `fours`, `wicket_type`, `dismissed`, `strike_rate`, `match_date`, `innings`, `user_id`) VALUES
(1418, 503, 76, 'Burhan', 3, 1, 3, '[1,1,1]', 0, 0, 'Not Out', 0, 100, '2024-12-05', 1, 20),
(1419, 503, 76, 'Hasan', 3, 1, 3, '[1,1,1]', 0, 0, 'Not Out', 0, 100, '2024-12-05', 1, 20),
(1420, 503, 77, 'Vdvd', 3, 1, 9, '[6,2,1]', 1, 0, 'Not Out', 0, 300, '2024-12-05', 2, 20),
(1421, 503, 77, ' Zvzvs', 0, 1, 0, '[]', 0, 0, 'Not Out', 0, 0, '2024-12-05', 2, 20),
(1422, 504, 77, 'Vsvs', 3, 1, 3, '[1,1,1]', 0, 0, 'Not Out', 0, 100, '2024-12-05', 1, 20),
(1423, 504, 77, 'Vzvsg', 3, 1, 3, '[1,1,1]', 0, 0, 'Not Out', 0, 100, '2024-12-05', 1, 20),
(1424, 504, 76, 'Hasan', 3, 1, 18, '[6,6,6]', 3, 0, 'Not Out', 0, 600, '2024-12-05', 2, 20),
(1425, 504, 76, 'Hasan', 3, 1, 18, '[6,6,6]', 0, 0, 'Not Out', 0, 600, '2024-12-05', 2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `bowleroverstats`
--

CREATE TABLE `bowleroverstats` (
  `id` int(11) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `t_id` int(11) DEFAULT NULL,
  `bowler_name` varchar(255) NOT NULL,
  `over_detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`over_detail`)),
  `over_number` int(11) NOT NULL,
  `bowler_type` varchar(50) NOT NULL,
  `total_boundaries_conceded` int(11) DEFAULT 0,
  `total_wickets` int(11) DEFAULT 0,
  `total_runs_conceded` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total_balls_bowled` int(11) DEFAULT 0,
  `economy_rate` float DEFAULT NULL,
  `innings` int(11) DEFAULT 1,
  `MatchDate` date NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `over_count` int(11) DEFAULT NULL,
  `total_runs_sum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bowleroverstats`
--

INSERT INTO `bowleroverstats` (`id`, `m_id`, `t_id`, `bowler_name`, `over_detail`, `over_number`, `bowler_type`, `total_boundaries_conceded`, `total_wickets`, `total_runs_conceded`, `total_balls_bowled`, `economy_rate`, `innings`, `MatchDate`, `user_id`, `over_count`, `total_runs_sum`) VALUES
(725, 503, 77, ' Zvzvs', '\"[\\\"0.1\\\",\\\"0.2\\\",\\\"0.3\\\",\\\"0.4\\\",\\\"0.5\\\",\\\"0.6\\\"]\"', 1, '', 0, 0, '\"[1,1,1,1,1,1]\"', 6, 6, 1, '2024-12-05', 20, 1, 6),
(726, 504, 76, 'Abrar', '\"[\\\"0.1\\\",\\\"0.2\\\",\\\"0.3\\\",\\\"0.4\\\",\\\"0.5\\\",\\\"0.6\\\"]\"', 1, '', 0, 0, '\"[1,1,1,1,1,1]\"', 6, 6, 1, '2024-12-05', 20, 1, 6);

--
-- Triggers `bowleroverstats`
--
DELIMITER $$
CREATE TRIGGER `update_over_runs_count` AFTER INSERT ON `bowleroverstats` FOR EACH ROW BEGIN
    -- Avoid updating the table directly inside the trigger
    -- Logic to calculate over_count or total_runs_sum can be done elsewhere
    -- You can log the event to another table or flag for later processing
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `matchdetail`
--

CREATE TABLE `matchdetail` (
  `id` int(11) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `m_overdetailId` int(11) DEFAULT NULL,
  `m_scoreId` int(11) DEFAULT NULL,
  `teamA_id` int(11) DEFAULT NULL,
  `teamB_id` int(11) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `venue` varchar(255) NOT NULL,
  `MatchDate` date NOT NULL,
  `MatchType` varchar(50) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `teamA_id` int(11) DEFAULT NULL,
  `teamB_id` int(11) DEFAULT NULL,
  `totalOvers` int(11) NOT NULL,
  `tossWon` varchar(50) NOT NULL,
  `battingFirst` varchar(50) NOT NULL,
  `bowlingFirst` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `teamA_id`, `teamB_id`, `totalOvers`, `tossWon`, `battingFirst`, `bowlingFirst`, `created_at`, `user_id`) VALUES
(503, 77, 76, 1, 'Hamza XI', '76', '77', '2024-12-05 00:00:08', 20),
(504, 76, 77, 1, 'MateenXI', '77', '76', '2024-12-05 00:02:53', 20);

-- --------------------------------------------------------

--
-- Table structure for table `matchfallofwicket`
--

CREATE TABLE `matchfallofwicket` (
  `id` int(11) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `batsmanA_name` varchar(255) NOT NULL,
  `batsmanB_name` varchar(255) NOT NULL,
  `batsmanA_score` int(11) DEFAULT 0,
  `batsmanB_score` int(11) DEFAULT 0,
  `batsmanA_ballFaced` int(11) DEFAULT 0,
  `batsmanB_ballFaced` int(11) DEFAULT 0,
  `fallWicket` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `p_id` int(11) NOT NULL,
  `Team_id` int(11) DEFAULT NULL,
  `player_name` varchar(50) DEFAULT NULL,
  `player_img` text DEFAULT NULL,
  `Role` text NOT NULL,
  `TotalRuns` int(11) DEFAULT 0,
  `TotalWickets` int(11) DEFAULT 0,
  `MatchPlayed` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `isPlaying` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`p_id`, `Team_id`, `player_name`, `player_img`, `Role`, `TotalRuns`, `TotalWickets`, `MatchPlayed`, `created_at`, `user_id`, `isPlaying`) VALUES
(107, 76, 'Mateen', 'http://localhost/MatchMate/PlayerImages/1732429850_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 11:30:50', 20, b'1'),
(108, 76, 'Adil', 'http://localhost/MatchMate/PlayerImages/1732429860_player_image.jpg', 'Bowler', 0, 0, 0, '2024-11-24 11:31:00', 20, b'1'),
(110, 76, 'Hamza', 'http://localhost/MatchMate/PlayerImages/1732429908_player_image.jpg', 'Wicketkeeper', 0, 0, 0, '2024-11-24 11:31:48', 20, b'1'),
(111, 76, 'Burhan', 'http://localhost/MatchMate/PlayerImages/1732429922_player_image.jpg', 'Bowler', 0, 0, 0, '2024-11-24 11:32:02', 20, b'1'),
(112, 76, 'Hasan', 'http://localhost/MatchMate/PlayerImages/1732429935_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 11:32:15', 20, b'1'),
(113, 76, 'Shangul', 'http://192.168.197.243/MatchMate/PlayerImages/1732429955_player_image.jpg', 'Allrounder', 0, 0, 0, '2024-11-24 11:32:28', 20, b'1'),
(114, 76, 'Muhammad hamza', 'http://localhost/MatchMate/PlayerImages/1732429978_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 11:32:58', 20, b'1'),
(115, 76, 'Abrar', 'http://192.168.197.243/MatchMate/PlayerImages/1732431604_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 11:59:51', 20, b'1'),
(116, 76, 'Rohan', 'http://192.168.197.243/MatchMate/PlayerImages/1732431639_player_image.jpg', 'Wicketkeeper', 0, 0, 0, '2024-11-24 12:00:31', 20, b'1'),
(117, 76, 'Khizar', 'http://192.168.197.243/MatchMate/PlayerImages/1732431867_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 12:04:04', 20, b'1'),
(118, 76, 'Mustafa', 'http://192.168.197.243/MatchMate/PlayerImages/1732431900_player_image.jpg', 'Allrounder', 0, 0, 0, '2024-11-24 12:04:51', 20, b'1'),
(119, 76, 'Abdullah', 'http://localhost/MatchMate/PlayerImages/1732431925_player_image.jpg', 'Batsman', 0, 0, 0, '2024-11-24 12:05:25', 20, b'0'),
(120, 77, 'Abc', '', 'Bowler', 0, 0, 0, '2024-11-24 13:27:19', 20, b'1'),
(121, 77, 'Bdb', '', 'Bowler', 0, 0, 0, '2024-11-24 13:27:25', 20, b'1'),
(122, 77, 'Bdbdh', '', 'Batsman', 0, 0, 0, '2024-11-24 13:27:30', 20, b'1'),
(123, 77, 'Vdvd', '', 'Wicketkeeper', 0, 0, 0, '2024-11-24 13:27:35', 20, b'1'),
(124, 77, 'Gdvdvs', '', 'Batsman', 0, 0, 0, '2024-11-24 13:27:40', 20, b'1'),
(125, 77, 'Vsvs', '', 'Bowler', 0, 0, 0, '2024-11-24 13:27:47', 20, b'1'),
(126, 77, ' Zvzvs', '', 'Allrounder', 0, 0, 0, '2024-11-24 13:27:53', 20, b'1'),
(127, 77, 'Vzvsg', '', 'Batsman', 0, 0, 0, '2024-11-24 13:27:59', 20, b'1'),
(128, 77, 'Bsbs sb', '', 'Batsman', 0, 0, 0, '2024-11-24 13:28:06', 20, b'1'),
(129, 77, 'Bx zb', '', 'Bowler', 0, 0, 0, '2024-11-24 13:28:11', 20, b'1'),
(130, 77, 'Bbbvvs', '', 'Batsman', 0, 0, 0, '2024-11-24 13:28:42', 20, b'0'),
(131, 77, 'Vsvsg', '', 'Bowler', 0, 0, 0, '2024-11-24 13:28:48', 20, b'0'),
(132, 77, 'Shnag gul bisma', 'http://192.168.197.243/MatchMate/PlayerImages/1733143358_player_image.jpg', 'Wicketkeeper', 0, 0, 0, '2024-11-24 19:26:41', 20, b'1'),
(133, 79, 'Sb', '', 'Batsman', 0, 0, 0, '2024-12-02 18:24:25', 20, b'1'),
(134, 79, 'Ty', '', 'Batsman', 0, 0, 0, '2024-12-02 18:24:34', 20, b'1'),
(135, 79, 'Jdjd', '', 'Batsman', 0, 0, 0, '2024-12-02 18:24:40', 20, b'1'),
(136, 79, 'Hdjw', '', 'Batsman', 0, 0, 0, '2024-12-02 18:24:46', 20, b'1'),
(137, 79, 'Aaa', '', 'Wicketkeeper', 0, 0, 0, '2024-12-02 18:25:04', 20, b'1'),
(138, 79, 'Ghh', '', 'Allrounder', 0, 0, 0, '2024-12-02 18:25:47', 20, b'1'),
(139, 79, 'Iiii', '', 'Wicketkeeper', 0, 0, 0, '2024-12-02 18:26:31', 20, b'1'),
(140, 79, 'Tudnd', '', 'Bowler', 0, 0, 0, '2024-12-02 18:26:40', 20, b'1'),
(141, 79, 'Uejej', '', 'Bowler', 0, 0, 0, '2024-12-02 18:26:49', 20, b'1'),
(142, 79, 'Tydm', '', 'Bowler', 0, 0, 0, '2024-12-02 18:26:57', 20, b'1'),
(143, 79, 'Hehe', '', 'Allrounder', 0, 0, 0, '2024-12-02 18:27:15', 20, b'1'),
(144, 80, 'T77', '', 'Batsman', 0, 0, 0, '2024-12-02 20:48:36', 21, b'0'),
(145, 80, 'Hsbs', '', 'Batsman', 0, 0, 0, '2024-12-02 20:49:02', 21, b'0'),
(146, 80, 'Hdjejw', '', 'Batsman', 0, 0, 0, '2024-12-02 20:49:08', 21, b'0'),
(147, 80, 'Bzbdbd', '', 'Batsman', 0, 0, 0, '2024-12-02 20:49:30', 21, b'0'),
(148, 80, 'Kekem', '', 'Bowler', 0, 0, 0, '2024-12-02 20:49:36', 21, b'0'),
(149, 80, 'Jdjel', '', 'Batsman', 0, 0, 0, '2024-12-02 20:49:42', 21, b'0'),
(150, 80, 'Kdkdnd', '', 'Batsman', 0, 0, 0, '2024-12-02 20:49:49', 21, b'0'),
(151, 80, 'Hamza', '', 'Wicketkeeper', 0, 0, 0, '2024-12-02 20:50:12', 21, b'0'),
(152, 80, 'Hdjdkd', '', 'Bowler', 0, 0, 0, '2024-12-02 20:50:21', 21, b'0'),
(153, 80, 'Udjej', '', 'Bowler', 0, 0, 0, '2024-12-02 20:50:31', 21, b'0'),
(154, 80, 'Jdjdn', '', 'Allrounder', 0, 0, 0, '2024-12-02 20:50:40', 21, b'0'),
(155, 81, 'Hamza', '', 'Batsman', 0, 0, 0, '2024-12-02 20:51:33', 21, b'0'),
(156, 81, 'Yasir', '', 'Batsman', 0, 0, 0, '2024-12-02 20:51:40', 21, b'0'),
(157, 81, 'Yadir', '', 'Batsman', 0, 0, 0, '2024-12-02 20:51:49', 21, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `m_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `result` varchar(255) NOT NULL,
  `total_runs_first_innings` int(11) NOT NULL,
  `total_wickets_first_innings` int(11) NOT NULL,
  `total_overs` float NOT NULL,
  `current_over_and_ball_first_innings` float NOT NULL,
  `total_runs_second_innings` int(11) NOT NULL,
  `total_wickets_second_innings` int(11) NOT NULL,
  `current_over_and_ball_second_innings` float NOT NULL,
  `team_won_id` int(11) DEFAULT NULL,
  `team_loss_id` int(11) DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id`, `m_id`, `user_id`, `result`, `total_runs_first_innings`, `total_wickets_first_innings`, `total_overs`, `current_over_and_ball_first_innings`, `total_runs_second_innings`, `total_wickets_second_innings`, `current_over_and_ball_second_innings`, `team_won_id`, `team_loss_id`, `date`) VALUES
(41, 503, 20, 'Hamza XI Wins by 10 wicket!', 6, 0, 1, 1, 8, 0, 0.2, 77, 76, '2024-12-05'),
(42, 504, 20, 'MateenXI Wins by 10 wicket!', 6, 0, 1, 1, 12, 0, 0.2, 76, 77, '2024-12-05');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `m_id` int(11) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `runScored` int(11) DEFAULT 0,
  `ballFaced` int(11) DEFAULT 0,
  `fours` int(11) DEFAULT 0,
  `sixes` int(11) DEFAULT 0,
  `wickets` int(11) DEFAULT 0,
  `noBalls` int(11) DEFAULT 0,
  `wides` int(11) DEFAULT 0,
  `extras` int(11) DEFAULT 0,
  `dotBalls` int(11) DEFAULT 0,
  `catches` int(11) DEFAULT 0,
  `bowled` int(11) DEFAULT 0,
  `LBW` int(11) DEFAULT 0,
  `runOuts` int(11) DEFAULT 0,
  `innings` int(11) DEFAULT 1,
  `scoreDate` date NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speed`
--

CREATE TABLE `speed` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `speedKPH` float NOT NULL,
  `speedMPH` float NOT NULL,
  `time_stamp` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `speed`
--

INSERT INTO `speed` (`id`, `userId`, `speedKPH`, `speedMPH`, `time_stamp`) VALUES
(1, 20, 143.43, 89.12, NULL),
(2, 20, 0, 0, NULL),
(3, 20, 0, 0, NULL),
(4, 20, 0, 0, NULL),
(5, 20, 150.9, 93.76, NULL),
(6, 20, 156.1, 97, NULL),
(7, 20, 156.1, 97, NULL),
(8, 20, 317.68, 197.4, NULL),
(9, 20, 128.2, 79.66, NULL),
(10, 20, 133.64, 83.04, NULL),
(11, 20, 156.44, 97.21, NULL),
(12, 20, 158.15, 98.27, NULL),
(13, 20, 71.01, 44.12, NULL),
(14, 20, 2.71, 1.68, NULL),
(15, 20, 87.8, 54.56, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `Team_name` varchar(255) NOT NULL,
  `Team_Logo` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `Team_name`, `Team_Logo`, `created_at`, `user_id`) VALUES
(76, 'MateenXI', '', '2024-11-23 13:22:02', 20),
(77, 'Hamza XI', 'http://localhost/MatchMate/TeamLogo/1732356503_team_logo.jpg', '2024-11-23 15:08:23', 20),
(79, 'Hasan', '', '2024-12-02 18:24:05', 20),
(80, 'Fyp', '', '2024-12-02 20:48:12', 21),
(81, 'Fyp2', '', '2024-12-02 20:51:22', 21);

-- --------------------------------------------------------

--
-- Table structure for table `tournamentplayer`
--

CREATE TABLE `tournamentplayer` (
  `p_id` int(11) NOT NULL,
  `Team_id` int(11) DEFAULT NULL,
  `player_name` varchar(50) DEFAULT NULL,
  `Role` text NOT NULL,
  `TotalRuns` int(11) DEFAULT 0,
  `TotalWickets` int(11) DEFAULT 0,
  `MatchPlayed` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tournamentplayer`
--

INSERT INTO `tournamentplayer` (`p_id`, `Team_id`, `player_name`, `Role`, `TotalRuns`, `TotalWickets`, `MatchPlayed`, `created_at`, `user_id`) VALUES
(0, 13, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Gshs', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Vsv', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Shsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Gsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Sbs ', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Z s', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Vs ', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 13, 'Sbsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Bsbs', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Bsbs', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, ' B', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'V', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'G', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Vvs', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'S s', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Vsb', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Sbs', '', 0, 0, 0, '2024-11-17 20:50:32', 20),
(0, 14, 'Sb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 14, 'Sbs', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Ha sb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Sbb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'BB s ', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Bsbs', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Bsb', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Aba', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'K', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Bs', '', 0, 0, 0, '2024-11-17 20:50:33', 20),
(0, 15, 'Hb', '', 0, 0, 0, '2024-11-17 20:50:33', 20);

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `tournament_name` varchar(255) NOT NULL,
  `number_of_teams` int(11) NOT NULL,
  `tournament_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`id`, `tournament_name`, `number_of_teams`, `tournament_type`, `created_at`, `user_id`) VALUES
(10, 'Psl', 3, 'League', '2024-11-17 14:50:25', 20),
(11, 'Vs', 3, 'Knocked-Out', '2024-11-17 15:43:48', 20),
(12, 'Bsb', 3, 'League', '2024-11-17 15:46:01', 20),
(13, 'Abc', 2, 'League', '2024-12-02 13:09:49', 20);

-- --------------------------------------------------------

--
-- Table structure for table `tournamentteam`
--

CREATE TABLE `tournamentteam` (
  `id` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tournamentteam`
--

INSERT INTO `tournamentteam` (`id`, `teamName`, `type`, `created_at`, `user_id`) VALUES
(13, 'Rr', 'League', '2024-11-17 15:46:18', 20),
(14, 'Ee', 'League', '2024-11-17 15:46:18', 20),
(15, 'Gg', 'League', '2024-11-17 15:46:18', 20),
(16, 'Rr', 'League', '2024-11-17 15:46:28', 20),
(17, 'Ee', 'League', '2024-11-17 15:46:28', 20),
(18, 'Gg', 'League', '2024-11-17 15:46:28', 20),
(19, 'Yeys', 'League', '2024-12-02 13:09:57', 20),
(20, 'Hshs', 'League', '2024-12-02 13:09:57', 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `token`, `token_created_at`) VALUES
(20, 'Mateen', 'mateenazeemi03@gmail.com', '$2y$10$9nHql9OuJduZliYVZR4e7eN.RM6rwwBlrXWCBOkkXGhW9YwqDirvG', 'fb7581b83ac85743dc2b3d893eb9f638', NULL),
(21, 'Hamza', 'hamza@gmail.com', '$2y$10$boOsZI/KcYfEbx7gV0UTGucC4sNhkfXTqxbkKA.pELE3JsBTjRM2y', '86033471c9e819b39cb42f446e39f9e1', NULL),
(22, 'Hamza', 'hamza12@gmail.com', '$2y$10$VuZ1pcxrFcGz9K.kuueAPOc6E956gnJ8S4ITpzDd/GKr0qaido06.', '67cf4466d527720d8cdb7caceb225a22', NULL),
(23, 'Burhan Ahmed ', 'Burhanahmed@gmail.com', '$2y$10$D/rC6mG/8YRpTjgyxS/W7eBwRKqqgOcyKjJg4AzLzYZ1hb7MDc5Nq', '1d123c30919f9c6f8b1caa97dba5bee5', NULL),
(24, 'M', 'M@gmail.com', '$2y$10$/oVNQZqokbyrFJg94ymaEuwm/g9p/bPNKwu.6BN36IWEmgH0xZHAK', '779f059c060f5affb027734886f699d0', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batsmanballbystats`
--
ALTER TABLE `batsmanballbystats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `t_id` (`t_id`),
  ADD KEY `fk_batsmanballbystats_user_id` (`user_id`);

--
-- Indexes for table `bowleroverstats`
--
ALTER TABLE `bowleroverstats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `t_id` (`t_id`),
  ADD KEY `fk_bowleroverstats_user_id` (`user_id`);

--
-- Indexes for table `matchdetail`
--
ALTER TABLE `matchdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `m_overdetailId` (`m_overdetailId`),
  ADD KEY `m_scoreId` (`m_scoreId`),
  ADD KEY `teamA_id` (`teamA_id`),
  ADD KEY `teamB_id` (`teamB_id`),
  ADD KEY `fk_matchdetail_user_id` (`user_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teamA_id` (`teamA_id`),
  ADD KEY `teamB_id` (`teamB_id`),
  ADD KEY `fk_matches_user_id` (`user_id`);

--
-- Indexes for table `matchfallofwicket`
--
ALTER TABLE `matchfallofwicket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `fk_matchfallofwicket_user_id` (`user_id`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `Team_id` (`Team_id`),
  ADD KEY `fk_player_user_id` (`user_id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_team_won` (`team_won_id`),
  ADD KEY `fk_team_loss` (`team_loss_id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `m_id` (`m_id`,`p_id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `fk_score_user_id` (`user_id`);

--
-- Indexes for table `speed`
--
ALTER TABLE `speed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_team_user_id` (`user_id`);

--
-- Indexes for table `tournamentplayer`
--
ALTER TABLE `tournamentplayer`
  ADD KEY `Team_id` (`Team_id`),
  ADD KEY `fk_player_user_id` (`user_id`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tournaments_user_id` (`user_id`);

--
-- Indexes for table `tournamentteam`
--
ALTER TABLE `tournamentteam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batsmanballbystats`
--
ALTER TABLE `batsmanballbystats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1426;

--
-- AUTO_INCREMENT for table `bowleroverstats`
--
ALTER TABLE `bowleroverstats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=727;

--
-- AUTO_INCREMENT for table `matchdetail`
--
ALTER TABLE `matchdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;

--
-- AUTO_INCREMENT for table `matchfallofwicket`
--
ALTER TABLE `matchfallofwicket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speed`
--
ALTER TABLE `speed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tournamentteam`
--
ALTER TABLE `tournamentteam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batsmanballbystats`
--
ALTER TABLE `batsmanballbystats`
  ADD CONSTRAINT `batsmanballbystats_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `batsmanballbystats_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_batsmanballbystats_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `bowleroverstats`
--
ALTER TABLE `bowleroverstats`
  ADD CONSTRAINT `bowleroverstats_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bowleroverstats_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bowleroverstats_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `matchdetail`
--
ALTER TABLE `matchdetail`
  ADD CONSTRAINT `fk_matchdetail_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `matchdetail_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matchdetail_ibfk_2` FOREIGN KEY (`m_overdetailId`) REFERENCES `bowleroverstats` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matchdetail_ibfk_3` FOREIGN KEY (`m_scoreId`) REFERENCES `score` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matchdetail_ibfk_4` FOREIGN KEY (`teamA_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matchdetail_ibfk_5` FOREIGN KEY (`teamB_id`) REFERENCES `team` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `fk_matches_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`teamA_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`teamB_id`) REFERENCES `team` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `matchfallofwicket`
--
ALTER TABLE `matchfallofwicket`
  ADD CONSTRAINT `fk_matchfallofwicket_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `matchfallofwicket_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `fk_player_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`Team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `fk_team_loss` FOREIGN KEY (`team_loss_id`) REFERENCES `team` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_team_won` FOREIGN KEY (`team_won_id`) REFERENCES `team` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `result_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `fk_score_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `score_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `player` (`p_id`) ON DELETE CASCADE;

--
-- Constraints for table `speed`
--
ALTER TABLE `speed`
  ADD CONSTRAINT `speed_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `fk_team_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `tournamentplayer`
--
ALTER TABLE `tournamentplayer`
  ADD CONSTRAINT `fk_tournamentplayer_team_id` FOREIGN KEY (`Team_id`) REFERENCES `tournamentteam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tournamentplayer_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `fk_tournaments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `tournamentteam`
--
ALTER TABLE `tournamentteam`
  ADD CONSTRAINT `tournamentteam_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
