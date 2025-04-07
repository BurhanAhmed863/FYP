<?php
include 'config.php';

header('Content-Type: application/json');

// Check if the user is logged in
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

// Fetch player name based on player ID
$playerQuery = "SELECT player_name FROM player WHERE p_id = $playerId AND user_id = $userId";
$playerResult = mysqli_query($conn, $playerQuery);

if (!$playerResult || mysqli_num_rows($playerResult) === 0) {
    echo json_encode(["status" => "error", "message" => "Player not found"]);
    exit;
}

$playerRow = mysqli_fetch_assoc($playerResult);
$bowlerName = $playerRow['player_name'];

// Fetch bowler stats
$query = "
    SELECT 
        p.player_name AS player_name,
        COUNT(DISTINCT b.m_id) AS total_matches,
        SUM(b.total_wickets) AS total_wickets,
        SUM(b.total_runs_concede) AS total_runs_concede,
        SUM(b.total_balls) AS total_balls,
        SUM(b.total_no_balls) AS total_no_balls,
        SUM(b.total_wide_balls) AS total_wide_balls,
        ROUND(SUM(b.total_runs_concede) / SUM(b.total_wickets), 2) AS bowling_average,
        ROUND((SUM(b.total_runs_concede) / SUM(b.total_balls)) * 6, 2) AS economy_rate,
        SUM(CASE WHEN b.total_runs_concede = 0 THEN 1 ELSE 0 END) AS maiden_overs,
        SUM(CASE WHEN b.total_wickets >= 3 THEN 1 ELSE 0 END) AS three_wicket_hauls,
        SUM(CASE WHEN b.total_wickets >= 5 THEN 1 ELSE 0 END) AS five_wicket_hauls,
        CONCAT(MAX(b.total_wickets), '/', MIN(b.total_runs_concede)) AS best_bowling
    FROM 
        (
            SELECT 
                b.m_id,
                SUM(b.total_wickets) AS total_wickets,
                SUM(b.total_balls_bowled) AS total_balls,
                SUM(b.total_runs_sum) AS total_runs_concede,
                SUM(b.total_no_balls) AS total_no_balls,
                SUM(b.total_wide_balls) AS total_wide_balls,
                COUNT(CASE WHEN b.total_runs_sum = 0 THEN 1 END) AS maiden_overs,
                COUNT(CASE WHEN b.total_wickets >= 3 THEN 1 END) AS three_wicket_hauls,
                COUNT(CASE WHEN b.total_wickets >= 5 THEN 1 END) AS five_wicket_hauls
            FROM 
                bowleroverstats b
            INNER JOIN 
                player p ON p.player_name = b.bowler_name
            WHERE 
                p.p_id = $playerId 
                AND p.user_id = $userId
            GROUP BY 
                b.m_id
        ) AS b
    INNER JOIN 
        player p ON p.p_id = $playerId
    WHERE 
        p.user_id = $userId;
";

$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $stats = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $stats[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $stats
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "No stats found for the player"]);
}

mysqli_close($conn);
?>
