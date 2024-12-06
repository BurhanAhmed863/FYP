<?php
include 'config.php'; // Include your database configuration

header('Content-Type: application/json');

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit;
}

$userId = (int) $_SESSION['user_id']; // Ensure user ID is an integer

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);
$matchId = isset($input['match_id']) ? (int) $input['match_id'] : 0;
$innings = isset($input['innings']) ? (int) $input['innings'] : 0;

// Validate required fields
if (empty($matchId) || empty($userId) || empty($innings)) {
    echo json_encode(["status" => "error", "message" => "Match ID and user ID are required"]);
    exit;
}

// Query to fetch the match data
$query = "
SELECT 
    tA.team_name AS teamA_name,
    tB.team_name AS teamB_name,
    m.totalOvers,
    
    -- Batting and Bowling Order Teams
    battingFirstTeam.team_name AS battingFirst_name,
    bowlingFirstTeam.team_name AS bowlingFirst_name,

    -- Batsman Data (Pre-calculated values)
    batsman_data.batsman_name,
    batsman_data.ball_number,
    batsman_data.runs_scored,
    batsman_data.fours,       -- Pre-calculated fours
    batsman_data.sixes,       -- Pre-calculated sixes
    batsman_data.strike_rate, -- Pre-calculated strike rate
    batsman_data.wicket_type, -- Pre-calculated wicket type
    
    -- Bowler Data (Pre-calculated values)
    bowler_data.bowler_name,
    bowler_data.total_runs,
    bowler_data.total_balls,
    bowler_data.over_count,   -- Pre-calculated over count
    bowler_data.total_wickets,   -- Pre-calculated total wickets
    bowler_data.economy_rate  -- Pre-calculated economy rate

FROM 
    matches m
LEFT JOIN 
    team tA ON m.teamA_id = tA.id
LEFT JOIN 
    team tB ON m.teamB_id = tB.id
LEFT JOIN 
    team battingFirstTeam ON m.battingFirst = battingFirstTeam.id
LEFT JOIN 
    team bowlingFirstTeam ON m.bowlingFirst = bowlingFirstTeam.id
LEFT JOIN (
    SELECT 
        b.m_id,
        b.batsman_name, 
        b.ball_number, 
        b.runs_scored,
        b.fours,        -- Fetch pre-calculated fours
        b.sixes,        -- Fetch pre-calculated sixes
        b.strike_rate,  -- Fetch pre-calculated strike rate
        b.wicket_type   -- Fetch pre-calculated wicket type
    FROM 
        batsmanballbystats b
    WHERE 
        b.user_id = ? 
        AND b.m_id = ?
        AND b.innings = ?  -- Condition for innings
    ORDER BY b.batsman_name, b.ball_number
) AS batsman_data ON m.id = batsman_data.m_id
LEFT JOIN (
    SELECT 
        bos.m_id,
        bos.bowler_name, 
        SUM(bos.total_runs_sum) AS total_runs, 
        SUM(bos.total_balls_bowled) AS total_balls,
        bos.over_count,    -- Fetch pre-calculated over count
        bos.total_wickets,    -- Fetch pre-calculated total wickets
        bos.economy_rate   -- Pre-calculated economy rate
    FROM 
        bowleroverstats bos
    WHERE 
        bos.user_id = ? 
        AND bos.m_id = ?
        AND bos.innings = ?  -- Condition for innings
    GROUP BY bos.bowler_name, bos.m_id, bos.over_count, bos.total_wickets, bos.economy_rate
) AS bowler_data ON m.id = bowler_data.m_id
WHERE 
    m.id = ?
    AND m.user_id = ?;
";



// Prepare and execute the query
if ($stmt = mysqli_prepare($conn, $query)) {
    // Bind only 4 parameters, not 8
    mysqli_stmt_bind_param($stmt, "iiiiiiii", $userId, $matchId, $innings, $userId, $matchId, $innings, $matchId, $userId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    // Fetch all rows of data (instead of just one row)
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    // Return response
    echo json_encode(["status" => "success", "data" => $data]);

    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["status" => "error", "message" => "Database query failed"]);
}

// Close the database connection
mysqli_close($conn);
?>
