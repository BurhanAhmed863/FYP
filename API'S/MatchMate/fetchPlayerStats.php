<?php
include 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id'];
$playerId = (int) ($_GET['playerId'] ?? 0);

if ($playerId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid player ID"]);
    exit;
}

// Fetch player name
$playerQuery = "SELECT player_name FROM player WHERE p_id = $playerId AND user_id = $userId";
$playerResult = mysqli_query($conn, $playerQuery);

if (!$playerResult || mysqli_num_rows($playerResult) === 0) {
    echo json_encode(["status" => "error", "message" => "Player not found"]);
    exit;
}

$playerRow = mysqli_fetch_assoc($playerResult);
$batsmanName = $playerRow['player_name'];

// Fetch player stats
$query = "
    SELECT 
        p.player_name AS player_name,
        COUNT(DISTINCT b.m_id) AS total_matches,
        SUM(b.max_runs) AS total_highest_runs,
        SUM(b.max_balls_faced) AS total_highest_balls_faced,
        SUM(b.sixes) AS total_sixes,
        SUM(b.fours) AS total_fours,
        CASE 
            WHEN SUM(b.dismissed) = 0 
            THEN 'Infinity'
            ELSE ROUND(SUM(b.max_runs) / SUM(b.dismissed), 2) 
        END AS strike_rate,
        MAX(b.max_runs) AS best_score,
        COUNT(CASE WHEN b.max_runs >= 50 THEN 1 END) AS fifties,
        COUNT(CASE WHEN b.max_runs >= 30 THEN 1 END) AS thirties,
        COUNT(CASE WHEN b.max_runs >= 100 THEN 1 END) AS hundreds,
        SUM(b.dismissed) AS total_dismissals,
        CASE 
            WHEN SUM(b.dismissed) > 0 
            THEN ROUND(SUM(b.max_runs) / SUM(b.dismissed), 2) 
            ELSE 0 
        END AS batting_average
    FROM 
        (
            SELECT 
                b.m_id,
                MAX(b.runs_scored) AS max_runs,
                MAX(b.ball_number) AS max_balls_faced,
                SUM(b.sixes) AS sixes,
                SUM(b.fours) AS fours,
                SUM(b.dismissed) AS dismissed
            FROM 
                batsmanballbystats b
            INNER JOIN 
                player p ON p.player_name = b.batsman_name
            WHERE 
                p.p_id = $playerId 
                AND p.user_id = $userId
            GROUP BY 
                b.m_id
        ) AS b
    INNER JOIN 
        player p ON p.p_id = $playerId
    WHERE 
        p.user_id = $userId
";

$statsResult = mysqli_query($conn, $query);

// Run positions analysis
$positionQuery = "
    SELECT run_positions 
    FROM batsmanballbystats b
    INNER JOIN player p ON p.player_name = b.batsman_name
    WHERE p.p_id = $playerId AND p.user_id = $userId
";

$positionResult = mysqli_query($conn, $positionQuery);
$positionCount = [];

if ($positionResult) {
    while ($row = mysqli_fetch_assoc($positionResult)) {
        $positions = json_decode($row['run_positions'], true);
        if (is_array($positions)) {
            foreach ($positions as $pos) {
                $pos = trim(strtolower($pos));
                if (!empty($pos)) {
                    $positionCount[$pos] = ($positionCount[$pos] ?? 0) + 1;
                }
            }
        }
    }
}

// Determine strong and weak side (single value or null)
$strongSide = null;
$weakSide = null;

if (!empty($positionCount)) {
    arsort($positionCount); // sort descending
    reset($positionCount);
    $strongSide = key($positionCount);

    asort($positionCount); // sort ascending
    reset($positionCount);
    $weakSide = key($positionCount);
}

// Combine stats and return
if ($statsResult && mysqli_num_rows($statsResult) > 0) {
    $stats = mysqli_fetch_assoc($statsResult);

    $stats['strong_side'] = $strongSide;
    $stats['weak_side'] = $weakSide;

    echo json_encode([
        "status" => "success",
        "data" => $stats
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "No stats found for the player"]);
}

mysqli_close($conn);
?>
