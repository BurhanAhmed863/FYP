<?php
include 'config.php'; // Include your database configuration

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

$input = json_decode(file_get_contents('php://input'), true);
$matchId = isset($input['match_id']) ? (int)$input['match_id'] : 0;

if (empty($matchId)) {
    echo json_encode(["status" => "error", "message" => "Match ID is required"]);
    exit;
}

// Prepare the SQL query to get team names and players for the batting and bowling teams
$query = "
SELECT 
    tA.Team_name AS batting_team_name,
    tB.Team_name AS bowling_team_name,
    m.totalOvers,
    m.battingFirst,
    m.bowlingFirst,
    pA.p_id AS batting_player_id,
    pA.player_name AS batting_players,
    pA.Role AS batting_roles,
    NULL AS bowling_player_id,
    NULL AS bowling_players,
    NULL AS bowling_roles
FROM
    player AS pA
JOIN
    matches AS m ON pA.team_id = m.battingFirst
JOIN
    team AS tA ON pA.team_id = tA.id  -- Batting team
JOIN
    team AS tB ON m.bowlingFirst = tB.id  -- Bowling team
WHERE
    pA.isPlaying = 1
    AND m.id = ?
    AND m.user_id = $userId

UNION ALL

SELECT 
    tB.Team_name AS batting_team_name,
    tA.Team_name AS bowling_team_name,
    m.totalOvers,
    m.battingFirst,
    m.bowlingFirst,
    NULL AS batting_player_id,
    NULL AS batting_players,
    NULL AS batting_roles,
    pB.p_id AS bowling_player_id,
    pB.player_name AS bowling_players,
    pB.Role AS bowling_roles
FROM
    player AS pB
JOIN
    matches AS m ON pB.team_id = m.bowlingFirst
JOIN
    team AS tA ON m.battingFirst = tA.id  -- Batting team
JOIN
    team AS tB ON pB.team_id = tB.id  -- Bowling team
WHERE
    pB.isPlaying = 1
    AND m.id = ?
    AND m.user_id = $userId
";

if ($stmt = mysqli_prepare($conn, $query)) {
    // Bind parameters
    mysqli_stmt_bind_param($stmt, "ii", $matchId, $matchId);

    // Execute the query
    mysqli_stmt_execute($stmt);

    // Get result
    $result = mysqli_stmt_get_result($stmt);

    // Check if the query executed successfully
    if ($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if ($data) {
            // Separate the players for batting and bowling teams
            $battingPlayers = [];
            $bowlingPlayers = [];

            foreach ($data as $row) {
                if ($row['batting_team_name'] != null) {
                    $battingPlayers[] = [
                        'id' => $row['batting_player_id'],
                        'name' => $row['batting_players'],
                        'role' => $row['batting_roles']
                    ];
                }

                if ($row['bowling_team_name'] != null) {
                    $bowlingPlayers[] = [
                        'id' => $row['bowling_player_id'],
                        'name' => $row['bowling_players'],
                        'role' => $row['bowling_roles']
                    ];
                }
            }

            // Return the data
            echo json_encode([
                "status" => "success",
                "batting_team" => $battingPlayers,
                "bowling_team" => $bowlingPlayers,
                "batting_team_name" => $data[0]['batting_team_name'], // Assuming first entry is for batting team
                "bowling_team_name" => $data[0]['bowling_team_name'],
                "battingFirst" => $data[0]["battingFirst"],
                "bowlingFirst" => $data[0]["bowlingFirst"],
                "totalOvers" => $data[0]["totalOvers"],
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "No data found for the provided match ID"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Database query failed"]);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
}

// Close the database connection
mysqli_close($conn);
?>
