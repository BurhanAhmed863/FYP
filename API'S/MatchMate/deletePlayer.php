<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Get team ID from POST request
$data = json_decode(file_get_contents("php://input"));
$playerId = (int) $data->player_id; // Get the team ID

if (empty($playerId)) {
    echo json_encode(["status" => "error", "message" => "Player ID is required"]);
    exit;
}

// Construct the SQL query to delete the player
$sql = "DELETE FROM player WHERE p_id = $playerId AND user_id = $userId";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success", "message" => "Player successfully deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error deleting player: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
