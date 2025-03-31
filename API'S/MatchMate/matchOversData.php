<?php
include 'config.php'; // Include your database configuration

header('Content-Type: application/json');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);
$matchId = isset($input['match_id']) ? (int) $input['match_id'] : 0;
$t_id = isset($input['team_id']) ? (int) $input['team_id'] : 0;
$bowlerName = isset($input['bowler_name']) ? $input['bowler_name'] : '';
$overDetail = isset($input['over_detail']) ? json_encode($input['over_detail']) : ''; // Encode array as JSON
$runsInOver = isset($input['total_runs_conceded']) ? json_encode($input['total_runs_conceded']) : ''; // Encode array as JSON
$totalWickets = isset($input['total_wickets']) ? (int) $input['total_wickets'] : 0;
$overNumber = isset($input['over_number']) ? (int) $input['over_number'] : 0;
$totalBallsBowled = isset($input['total_balls_bowled']) ? (int) $input['total_balls_bowled'] : 0;
$totalRunsSum = isset($input['total_runs_sum']) ? (int) $input['total_runs_sum'] : 0;
$totalNoBalls = isset($input['total_no_balls']) ? (int) $input['total_no_balls'] : 0;
$totalWideBalls = isset($input['total_wide_balls']) ? (int) $input['total_wide_balls'] : 0;
$economyRate = isset($input['economy_rate']) ? (float) $input['economy_rate'] : 0.0;
$inning = isset($input['innings']) ? (int) $input['innings'] : 1;

// Validate required fields
if (empty($matchId) || empty($t_id) || empty($bowlerName) || empty($economyRate)) {
    echo json_encode(["status" => "error", "message" => "Match ID, team ID, and bowler name are required"]);
    exit;
}

// Step 1: Calculate over_count (number of overs bowled by the bowler)
$overCount = 0;

// Query to get the current over count
$overCountQuery = "
    SELECT COUNT(*) AS over_count 
    FROM bowleroverstats 
    WHERE m_id = ? AND t_id = ? AND bowler_name = ? AND user_id = ?
";

if ($stmt = mysqli_prepare($conn, $overCountQuery)) {
    mysqli_stmt_bind_param($stmt, "iisi", $matchId, $t_id, $bowlerName, $userId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $overCount);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);
}
$overCount += 1;

// Step 2: Insert Data
$query = "INSERT INTO bowleroverstats 
(m_id, t_id, bowler_name, over_detail, over_number, total_wickets, total_runs_conceded, total_balls_bowled, economy_rate, innings, user_id, over_count, total_runs_sum, total_wide_balls, total_no_balls) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = mysqli_prepare($conn, $query)) {
    mysqli_stmt_bind_param($stmt, "iississidiiiiii", 
        $matchId, $t_id, $bowlerName, $overDetail, $overNumber, 
        $totalWickets, $runsInOver, $totalBallsBowled, $economyRate, 
        $inning, $userId, $overCount, $totalRunsSum, $totalWideBalls, $totalNoBalls
    );

    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["status" => "success", "message" => "Match data saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database query failed"]);
    }
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
}

mysqli_close($conn);
?>
