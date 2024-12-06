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

// Fetch the player's status
$sql = "SELECT isPlaying FROM player WHERE p_id = $playerId AND user_id = $userId";
$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    echo json_encode([
        "status" => "success",
        "data" => $row
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Player not found"]);
}

mysqli_close($conn);
?>
