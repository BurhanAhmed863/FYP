<?php
include 'config.php';

header('Content-Type: application/json');

// Start the session and check for user ID
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = intval($_SESSION['user_id']); // Get user ID from the session and ensure it's an integer

// Fetch teams where user_id matches the logged-in user
$sql = "SELECT id, Team_name AS name, Team_Logo AS logo FROM team WHERE user_id = $userId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $teams = [];
    $logos =[];
    while ($row = $result->fetch_assoc()) {
        // Push team details into the array
        $teams[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'logo' => $row['logo'],
        ];
        
        // Also fetch the logo separately if needed, you can handle it on the front-end.
        $logos[] =[
            'logo' => basename($row['logo']),
        ];
    }
    // echo json_encode(["status" => "success", "players" => $players, "player_img" => $player_img]);
    echo json_encode([
        "status" => "success", 
        "teams" => $teams, 
        "logo" => $logos // Return logos as a separate array
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "No teams found for the user"]);
}

$conn->close();
?>
