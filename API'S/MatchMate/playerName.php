<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Handle image upload if the file is provided
$uploadDir = 'G:/xampp/htdocs/MatchMate/PlayerImages/'; // Adjust the path accordingly
$playerImg = ''; // Variable to store the image path

if (isset($_FILES['player_img'])) {
    $timestamp = time();
    $uploadFile = $uploadDir . $timestamp . '_' . basename($_FILES['player_img']['name']); // Create a unique file name

    // Attempt to move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['player_img']['tmp_name'], $uploadFile)) {
        $playerImg = 'http://localhost/MatchMate/PlayerImages/' . $timestamp . '_' . basename($_FILES['player_img']['name']); // Set the URL of the uploaded image
    } else {
        echo json_encode(["status" => "error", "message" => "Error uploading player image"]);
        exit;
    }
}

// Get data from the POST request
$teamId = isset($_POST['team_id']) ? (int) $_POST['team_id'] : null; // Get team ID from POST
$playerName = isset($_POST['player_name']) ? mysqli_real_escape_string($conn, $_POST['player_name']) : ''; // Player Name (sanitize input)
$role = isset($_POST['role']) ? mysqli_real_escape_string($conn, $_POST['role']) : ''; // Role (Player type)

// Validate input
if (empty($teamId) || empty($playerName) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "Team ID, player name, and role are required"]);
    exit;
}

// Construct the SQL query to insert the player into the database
$sql = "INSERT INTO player (Team_id, player_name, player_img, role, user_id) 
        VALUES ($teamId, '$playerName', '$playerImg', '$role', $userId)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success", "message" => "Player successfully added"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error adding player: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
