<?php
include 'config.php'; // Include your database configuration

header('Content-Type: application/json');

// Ensure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id'];

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Debug: Log input data
error_log("Input data: " . print_r($input, true));

// Check for required fields and return an error if any field is missing or empty
$requiredFields = [
    'match_id',
    'team_won_id',
    'team_loss_id', 
    'result', 
    'total_runs_first_innings', 
    'total_wickets_first_innings', 
    'total_overs', 
    'total_runs_second_innings', 
    'total_wickets_second_innings', 
    'current_over_and_ball_second_innings', 
    'current_over_and_ball_first_innings'
];

foreach ($requiredFields as $field) {
    if (!isset($input[$field]) || $input[$field] === '') {
        echo json_encode(["status" => "error", "message" => "Missing or empty field: $field"]);
        exit;
    }
}

// Extract and sanitize inputs
$matchId = (int) $input['match_id'];
$teamWon = (int) $input['team_won_id'];
$teamLoss = (int) $input['team_loss_id'];
$resultMessage = mysqli_real_escape_string($conn, $input['result']);
$totalRunsFirstInnings = (int) $input['total_runs_first_innings'];
$totalWicketsFirstInnings = (int) $input['total_wickets_first_innings'];
$totalOvers = (float) $input['total_overs'];
$totalRunsSecondInnings = (int) $input['total_runs_second_innings'];
$totalWicketsSecondInnings = (int) $input['total_wickets_second_innings'];
$currentOverAndBallSecondInnings = (float) $input['current_over_and_ball_second_innings'];
$currentOverAndBallFirstInnings = (float) $input['current_over_and_ball_first_innings'];

// Debug: Log extracted variables
error_log("Sanitized data: match_id: $matchId, team_won_id: $teamWon, team_loss_id:, $teamLoss, result: $resultMessage, total_runs_first_innings: $totalRunsFirstInnings, total_wickets_first_innings: $totalWicketsFirstInnings, total_overs: $totalOvers, total_runs_second_innings: $totalRunsSecondInnings, total_wickets_second_innings: $totalWicketsSecondInnings, current_over_and_ball_first_innings: $currentOverAndBallFirstInnings, current_over_and_ball_second_innings: $currentOverAndBallSecondInnings");

// Construct SQL query
$query = "
    INSERT INTO result (
        m_id, user_id, result, 
        total_runs_first_innings, total_wickets_first_innings, total_overs,
        current_over_and_ball_first_innings, 
        total_runs_second_innings, total_wickets_second_innings, 
        current_over_and_ball_second_innings, team_won_id, team_loss_id
    ) VALUES (
        $matchId, $userId, '$resultMessage',
        $totalRunsFirstInnings, $totalWicketsFirstInnings, $totalOvers,
        $currentOverAndBallFirstInnings, 
        $totalRunsSecondInnings, $totalWicketsSecondInnings,
        $currentOverAndBallSecondInnings, $teamWon, $teamLoss
    )
";

// Debug: Log SQL query
error_log("Executing SQL: $query");

// Execute the query
if (mysqli_query($conn, $query)) {
    echo json_encode(["status" => "success", "message" => "Result saved successfully!"]);
} else {
    error_log("Database error: " . mysqli_error($conn));
    echo json_encode(["status" => "error", "message" => "Failed to save result"]);
}

// Close the database connection
mysqli_close($conn);
?>
