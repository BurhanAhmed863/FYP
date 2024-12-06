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
$uploadDir = 'G:/xampp/htdocs/MatchMate/TeamLogo/'; // Adjust the path accordingly
$teamLogo = '';

if (isset($_FILES['logo'])) {
    $timestamp = time();
    $uploadFile = $uploadDir . $timestamp . '_' . basename($_FILES['logo']['name']);

    if (move_uploaded_file($_FILES['logo']['tmp_name'], $uploadFile)) {
        $teamLogo = 'http://localhost/MatchMate/TeamLogo/' . $timestamp . '_' . basename($_FILES['logo']['name']); // Adjust the domain/path
    } else {
        echo json_encode(["status" => "error", "message" => "Error uploading logo"]);
        exit;
    }
}

// Get team name from POST request
$teamName = mysqli_real_escape_string($conn, trim($_POST['teamName'] ?? ''));

if (empty($teamName)) {
    echo json_encode(["status" => "error", "message" => "Team name is required"]);
    exit;
}

// Construct the SQL query with properly escaped variables
$sql = "INSERT INTO team (Team_name, Team_Logo, user_id) 
        VALUES ('$teamName', '$teamLogo', $userId)";

if (mysqli_query($conn, $sql)) {
    $teamId = mysqli_insert_id($conn); // Get the ID of the newly inserted team

    // Return success response
    echo json_encode([
        "status" => "success",
        "message" => "Team successfully added",
        "team" => ["id" => $teamId, "name" => $teamName, "logo" => $teamLogo]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error adding team: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
