<?php
include 'config.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Ensure user is logged in
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate input
        $tournamentName = mysqli_real_escape_string($conn, trim($data['tournamentName']));
        $noOfTeam = intval($data['noOfTeam']);
        $tournamentType = mysqli_real_escape_string($conn, trim($data['tournamentType']));

        if (!empty($tournamentName) && $noOfTeam > 0 && !empty($tournamentType)) {
            // Insert tournament data into the database
            $insertQuery = "INSERT INTO `tournaments` (`tournament_name`, `number_of_teams`, `tournament_type`, `user_id`) 
                            VALUES ('$tournamentName', '$noOfTeam', '$tournamentType', '$userId')";
            $result = mysqli_query($conn, $insertQuery);

            if ($result) {
                echo json_encode(array('msg' => 'Tournament added successfully', 'status' => 'Success'));
            } else {
                echo json_encode(array('msg' => 'Error saving tournament', 'status' => 'Error'));
            }
        } else {
            echo json_encode(array('msg' => 'Invalid data', 'status' => 'Error'));
        }
    } else {
        echo json_encode(array('msg' => 'User not logged in', 'status' => 'Error'));
    }

    mysqli_close($conn);
} else {
    echo json_encode(array('msg' => 'Invalid request method', 'status' => 'Error'));
}
?>
