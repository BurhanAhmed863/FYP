<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Handle image upload if provided
$uploadDir = 'G:/xampp/htdocs/MatchMate/PlayerImages/'; // Adjust the path accordingly
$playerImg = '';

if (isset($_FILES['playerImg'])) {
    $timestamp = time();
    $uploadFile = $uploadDir . $timestamp . '_' . basename($_FILES['playerImg']['name']);

    if (move_uploaded_file($_FILES['playerImg']['tmp_name'], $uploadFile)) {
        $playerImg = 'http://192.168.197.243/MatchMate/PlayerImages/' . $timestamp . '_' . basename($_FILES['playerImg']['name']);
    } else {
        echo json_encode(["status" => "error", "message" => "Error uploading player image"]);
        exit;
    }
}

// Get data from POST request
$playerId = (int) ($_POST['playerId'] ?? 0); // Ensure player ID is an integer
$playerName = mysqli_real_escape_string($conn, trim($_POST['playerName'] ?? ''));
$role = mysqli_real_escape_string($conn, trim($_POST['role'] ?? ''));

if (empty($playerName) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "Player name and role are required"]);
    exit;
}

if ($playerId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid player ID"]);
    exit;
}

// Construct the SQL query for updating the player
$sql = "UPDATE player SET player_name = '$playerName', role = '$role'";

if (!empty($playerImg)) {
    $sql .= ", player_img = '$playerImg'"; // Only update image if provided
}

$sql .= " WHERE p_id = $playerId AND user_id = $userId"; // Ensure the user is the owner of the player

// Execute the query
if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Player successfully updated",
        "player" => [
            "id" => $playerId,
            "name" => $playerName,
            "role" => $role,
            "img" => $playerImg
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating player: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
