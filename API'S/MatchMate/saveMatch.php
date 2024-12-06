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
$matchId = isset($input['match_id']) ? (int)$input['match_id'] : 0;
$t_id = isset($input['team_id']) ? (int)$input['team_id'] : 0; // Team ID from frontend
$bowlerName = isset($input['bowler_name']) ? $input['bowler_name'] : '';
$overDetail = isset($input['over_detail']) ? json_encode($input['over_detail']) : ''; // Encode array as JSON
$runsInOver = isset($input['total_runs_conceded']) ? json_encode($input['total_runs_conceded']) : ''; // Encode array as JSON
$totalWickets = isset($input['total_wickets']) ? (int)$input['total_wickets'] : 0;
$totalBallsBowled = isset($input['total_balls_bowled']) ? (int)$input['total_balls_bowled'] : 0;
$economyRate = isset($input['economy_rate']) ? (float)$input['economy_rate'] : 0.0;
$inning = isset($input['innings']) ? (int)$input['innings'] : 1;

// Validate required fields
if (empty($matchId) || empty($t_id) || empty($bowlerName)) {
    echo json_encode(["status" => "error", "message" => "Match ID, team ID, and bowler name are required"]);
    exit;
}

// Insert data into the database
$query = "
INSERT INTO bowleroverstats (m_id, t_id, bowler_name, over_detail, total_wickets, total_runs_conceded, total_balls_bowled, economy_rate, innings, user_id) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

if ($stmt = mysqli_prepare($conn, $query)) {
    // Bind parameters
    mysqli_stmt_bind_param($stmt, "iisssiiidi", $matchId, $t_id, $bowlerName, $overDetail, $runsInOver, $totalWickets, $totalBallsBowled, $economyRate, $inning, $userId);

    // Execute the query
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["status" => "success", "message" => "Match data saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database query failed"]);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
}

// Close the database connection
mysqli_close($conn);
?>
