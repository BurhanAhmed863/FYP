<?php
// Start the session to retrieve the user ID
// Include your database connection file
include('config.php');  // Adjust the file path as needed

// Check if the user is logged in (assuming user_id is stored in session)
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User is not logged in.']);
    exit();
}

// Get the user_id from the session
$user_id = $_SESSION['user_id'];

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the necessary data is provided
if (!isset($data['teamsPlayers']) || !isset($data['teamNames'])) {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing.']);
    exit();
}

// Extract the data
$teamsPlayers = $data['teamsPlayers'];  // An array of player names for each team
$teamNames = $data['teamNames'];  // An array of team names

// Assume you want to insert data into a table in the database
// Example: Table structure - tournamentplayer (id, team_id, player_name, user_id) and tournamentteam (id, team_name, user_id, created_at)

// Loop through teams and their players
foreach ($teamsPlayers as $teamIndex => $players) {
    // Insert team name (optional, depends on your database structure)
    $teamName = $teamNames[$teamIndex];
    
    // First, check if the team already exists in the tournamentteam table, for the current user and today
    $teamQuery = "SELECT id FROM tournamentteam WHERE teamName = '$teamName' AND user_id = '$user_id' AND DATE(created_at) = CURDATE()";
    $teamResult = mysqli_query($conn, $teamQuery);
    
    if (mysqli_num_rows($teamResult) > 0) {
        // Team exists, get its ID
        $team = mysqli_fetch_assoc($teamResult);
        $teamId = $team['id'];
    } else {
        // Team does not exist, insert it
        $insertTeamQuery = "INSERT INTO tournamentteam (team_name, user_id, created_at) VALUES ('$teamName', '$user_id', NOW())";
        if (!mysqli_query($conn, $insertTeamQuery)) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to insert team.']);
            exit();
        }
        $teamId = mysqli_insert_id($conn);  // Get the last inserted team ID
    }

    // Insert players for this team
    foreach ($players as $playerName) {
        if (!empty(trim($playerName))) {
            $insertPlayerQuery = "INSERT INTO tournamentplayer (Team_id, player_name, user_id) VALUES ('$teamId', '$playerName', '$user_id')";
            if (!mysqli_query($conn, $insertPlayerQuery)) {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert player.']);
                exit();
            }
        }
    }
}

// Return success message
echo json_encode(['status' => 'success', 'message' => 'Players submitted successfully!']);

// Close the database conn
mysqli_close($conn);
?>
