<?php
include 'config.php'; // Include your database connection
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input data
    $teamId1 = trim($input['team1Id'] ?? '');
    $teamId2 = trim($input['team2Id'] ?? '');
    $totalOvers = $input['totalOvers'] ?? null; // Total overs
    $tossWon = $input['tossWon'] ?? null; // Team that won the toss
    $battingFirst = trim($input['battingFirst'] ?? ''); // Team batting first
    $bowlingFirst = trim($input['bowlingFirst'] ?? ''); // Team bowling first

    // Input validation
    if (is_null($teamId1) || is_null($teamId2) || is_null($totalOvers) || is_null($tossWon) || is_null($battingFirst) || is_null($bowlingFirst) || is_null($userId)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    // Get Team A ID (latest entry)
    $sql1 = $conn->prepare("SELECT Team_name FROM team WHERE id = ?");
    $sql1->bind_param("i", $teamId1);  // Use "i" for integer
    $sql1->execute();
    $result1 = $sql1->get_result();
    if ($result1->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Team A not found']);
        exit;
    }

    // Get Team B ID (latest entry)
    $sql2 = $conn->prepare("SELECT Team_name FROM team WHERE id = ?");
    $sql2->bind_param("i", $teamId2);  // Use "i" for integer
    $sql2->execute();
    $result2 = $sql2->get_result();
    if ($result2->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Team B not found']);
        exit;
    }

    // Prepare the SQL statement to insert match details
    $stmt = $conn->prepare("INSERT INTO matches (teamA_id, teamB_id, totalOvers, tossWon, battingFirst, bowlingFirst, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Bind the parameters
    $stmt->bind_param("iiisiii", $teamId1, $teamId2, $totalOvers, $tossWon, $battingFirst, $bowlingFirst, $userId);

    // Execute the statement and check if it was successful
    if ($stmt->execute()) {
        // Get the last inserted matchId
        $matchId = $conn->insert_id;

        // Send success response with the matchId
        echo json_encode([
            'status' => 'success',
            'message' => 'Match details saved successfully',
            'matchId' => $matchId
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save match details']);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

// Close the database connection
$conn->close();
?>
