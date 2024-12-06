<?php
include 'config.php'; // Include database configuration

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Get team ID from GET request
$teamId = (int) $_GET['team_id']; // The team ID from the query string

if (empty($teamId)) {
    echo json_encode(["status" => "error", "message" => "Team ID is required"]);
    exit;
}

// Fetch players for the given team
$sql = "SELECT * FROM player WHERE Team_id = $teamId";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $players = [];
    $playerImg = [];
    $isPlaying = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $players[] = [
            'id' => $row['p_id'],
            'player_name' => $row['player_name'],
            'player_img' => $row['player_img'],
            'role' => $row['Role'],
            'isPlaying' => (int)$row['isPlaying'],
        ];
        $player_img[] =[
            'player_img' => basename($row['player_img']),
        ];

        // $isPlaying[] =[
        // ];
    }

    echo json_encode(["status" => "success", "players" => $players, "player_img" => $player_img]);
} else {
    echo json_encode(["status" => "error", "message" => "No players found for this team"]);
}

mysqli_close($conn);
?>
