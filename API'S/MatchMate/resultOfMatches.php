<?php
include 'config.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Ensure the request is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch results with team names for the logged-in user
    $query = "
        SELECT 
            r.*, 
            t1.Team_name AS team_won_name, 
            t2.Team_name AS team_loss_name 
        FROM 
            result r
        LEFT JOIN 
            team t1 ON r.team_won_id = t1.id
        LEFT JOIN 
            team t2 ON r.team_loss_id = t2.id
        WHERE 
            r.user_id = $userId
        ORDER BY 
            r.date DESC"; // Adjust fields and table names as necessary

    $result = mysqli_query($conn, $query);

    if ($result) {
        $resultsArray = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $resultsArray[] = $row;
        }

        echo json_encode([
            "status" => "success",
            "results" => $resultsArray
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to fetch results"]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method"]);
?>
