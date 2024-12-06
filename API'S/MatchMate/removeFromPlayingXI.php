<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id'];

// Decode JSON input from the request body
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$playerId = (int) ($data['playerId'] ?? 0);

if ($playerId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid player ID"]);
    exit;
}

// Check if the player exists and belongs to the user
$sql = "SELECT * FROM player WHERE p_id = $playerId AND user_id = $userId";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) === 0) {
    echo json_encode(["status" => "error", "message" => "Player not found"]);
    exit;
}

// Update the player's status to not playing
$updateSql = "UPDATE player SET isPlaying = 0 WHERE p_id = $playerId";
if (mysqli_query($conn, $updateSql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Player successfully removed from Playing XI"
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating player status"]);
}

mysqli_close($conn);
?>
