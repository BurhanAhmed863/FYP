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

// Extract variables from the input
$matchId = isset($input['match_id']) ? (int) $input['match_id'] : 0;
$teamId = isset($input['team_id']) ? (int) $input['team_id'] : 0;
$batsmen = isset($input['batsmen']) ? $input['batsmen'] : [];
$inning = isset($input['innings']) ? (int) $input['innings'] : 1;

// Validate required fields
if (empty($matchId) || empty($teamId) || empty($batsmen)) {
    echo json_encode(["status" => "error", "message" => "Match ID, team ID, and batsmen data are required"]);
    exit;
}

// Process each batsman's data
foreach ($batsmen as $batsman) {
    $batsmanName = $batsman['batsman_name'];
    $runsScored = isset($batsman['runs_scored']) ? (int) $batsman['runs_scored'] : 0;
    $ballsFaced = isset($batsman['balls_faced']) ? (int) $batsman['balls_faced'] : 0;
    $strikeRate = isset($batsman['strike_rate']) ? (float) $batsman['strike_rate'] : 0.0;
    $fours = isset($batsman['fours']) ? (int) $batsman['fours'] : 0;
    $sixes = isset($batsman['sixes']) ? (int) $batsman['sixes'] : 0;
    $ones = isset($batsman['ones']) ? (int) $batsman['ones'] : 0;
    $twos = isset($batsman['twos']) ? (int) $batsman['twos'] : 0;
    $threes = isset($batsman['threes']) ? (int) $batsman['threes'] : 0;
    $dots = isset($batsman['dots']) ? (int) $batsman['dots'] : 0;
    $overNumber = isset($batsman['over_number']) ? (int) $batsman['over_number'] : 0;
    $ballRuns = isset($batsman['ball_runs']) ? json_encode($batsman['ball_runs']) : json_encode([]); // Encode ballRuns as JSON
    $dismissed = isset($batsman['dismissed']) ? (int) $batsman['dismissed'] : 0;

    // Insert or update batsman's stats into the database
    $query = "
        INSERT INTO batsmanballbystats 
        (m_id, t_id, batsman_name, ball_number, over_number, runs_scored, ball_runs, sixes, fours, dismissed, strike_rate, innings, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            runs_scored = VALUES(runs_scored),
            ball_number = VALUES(ball_number),
            ball_runs = VALUES(ball_runs),
            sixes = VALUES(sixes),
            fours = VALUES(fours),
            dismissed = VALUES(dismissed),
            strike_rate = VALUES(strike_rate)
    ";

    if ($stmt = mysqli_prepare($conn, $query)) {
        mysqli_stmt_bind_param(
            $stmt,
            "iisiiisiiidii", // 12 types: integer (i), string (s), double (d)
            $matchId,        // i
            $teamId,         // i
            $batsmanName,    // s
            $ballsFaced,     // i
            $overNumber,     // i
            $runsScored,     // i
            $ballRuns,       // s (JSON string)
            $sixes,          // i
            $fours,          // i
            $dismissed,     // i
            $strikeRate,     // d
            $inning,         // i
            $userId          // i
        );

        if (!mysqli_stmt_execute($stmt)) {
            // Log the error if execution fails
            error_log("SQL Error: " . mysqli_error($conn));
            echo json_encode(["status" => "error", "message" => "Database execution error"]);
            exit;
        }

        mysqli_stmt_close($stmt);
    } else {
        // Log preparation error
        error_log("SQL Prepare Error: " . mysqli_error($conn));
        echo json_encode(["status" => "error", "message" => "Database query preparation failed"]);
        exit;
    }
}

// Respond with success
echo json_encode(["status" => "success", "message" => "Batsmen data saved successfully"]);
mysqli_close($conn);
?>