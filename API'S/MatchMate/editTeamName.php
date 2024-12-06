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

// Check if logo is uploaded
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

// Get the team ID and team name from POST request
$teamId = (int) ($_POST['teamId'] ?? 0); // Ensure team ID is an integer
$teamName = mysqli_real_escape_string($conn, trim($_POST['teamName'] ?? ''));

if (empty($teamName)) {
    echo json_encode(["status" => "error", "message" => "Team name is required"]);
    exit;
}

if ($teamId <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid team ID"]);
    exit;
}

// Construct the SQL query for updating the team
$sql = "UPDATE team SET Team_name = '$teamName'";

if (!empty($teamLogo)) {
    $sql .= ", Team_Logo = '$teamLogo'"; // Only update logo if it's provided
}

$sql .= " WHERE id = $teamId AND user_id = $userId"; // Ensure that the user is the owner of the team

// Execute the query
if (mysqli_query($conn, $sql)) {
    // Return success response
    echo json_encode([
        "status" => "success",
        "message" => "Team successfully updated",
        "team" => [
            "id" => $teamId,
            "name" => $teamName,
            "logo" => $teamLogo
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating team: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
