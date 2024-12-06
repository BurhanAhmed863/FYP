<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Decode JSON input from the request body
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

error_log("Raw input received: " . $requestBody);
error_log("Parsed data: " . print_r($data, true));

$playerId = (int) ($data['playerId'] ?? 0);
error_log("Extracted playerId: " . $playerId);

if ($playerId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid player ID"]);
    exit;
}

// Get the Team_id for the given player
$teamQuery = "SELECT Team_id FROM player WHERE p_id = $playerId AND user_id = $userId";
$teamResult = mysqli_query($conn, $teamQuery);

if ($teamResult && mysqli_num_rows($teamResult) > 0) {
    $teamRow = mysqli_fetch_assoc($teamResult);
    $teamId = (int) $teamRow['Team_id'];
} else {
    echo json_encode(["status" => "error", "message" => "Team not found for the player"]);
    exit;
}

// Check the current count of players in Playing XI for the specific team
$countQuery = "SELECT COUNT(*) AS count FROM player WHERE isPlaying = 1 AND user_id = $userId AND Team_id = $teamId";
$countResult = mysqli_query($conn, $countQuery);

if ($countResult) {
    $row = mysqli_fetch_assoc($countResult);
    $playingCount = (int) $row['count'];

    if ($playingCount >= 11) {
        echo json_encode(["status" => "error", "message" => "Cannot add more than 11 players to Playing XI for this team"]);
        exit;
    }
} else {
    echo json_encode(["status" => "error", "message" => "Failed to check Playing XI count"]);
    exit;
}

// Check if the player exists in the database
$sql = "SELECT * FROM player WHERE p_id = $playerId AND user_id = $userId AND Team_id = $teamId";
error_log("SQL Query: " . $sql);

$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) === 0) {
    error_log("No player found for playerId: " . $playerId);
    echo json_encode(["status" => "error", "message" => "Player not found in this team"]);
    exit;
}

// Update the player's status to "isPlaying"
$updateSql = "UPDATE player SET isPlaying = 1 WHERE p_id = $playerId AND user_id = $userId AND Team_id = $teamId";
if (mysqli_query($conn, $updateSql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Player successfully added to Playing XI"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating player"]);
}

mysqli_close($conn);
?>
