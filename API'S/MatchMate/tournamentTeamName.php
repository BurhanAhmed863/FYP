<?php
include 'config.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(array('msg' => 'User not logged in', 'status' => 'Error'));
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);

    $teamNames = $data['teamNames'];
    $type = mysqli_real_escape_string($conn, trim($data['type']));

    if (empty($teamNames) || empty($type)) {
        echo json_encode(array('msg' => 'Invalid data provided', 'status' => 'Error'));
        exit;
    }

    $errors = [];
    foreach ($teamNames as $teamName) {
        $teamName = mysqli_real_escape_string($conn, trim($teamName));
        if (!empty($teamName)) {
            $insertQuery = "INSERT INTO `tournamentteam` (`teamname`, `type`, `user_id`) VALUES ('$teamName', '$type', '$user_id')";
            $result = mysqli_query($conn, $insertQuery);

            if (!$result) {
                $errors[] = "Failed to insert team: $teamName";
            }
        }
    }

    if (empty($errors)) {
        echo json_encode(array('msg' => 'Teams added successfully', 'status' => 'Success'));
    } else {
        echo json_encode(array('msg' => 'Some teams failed to add', 'status' => 'Error', 'errors' => $errors));
    }

    mysqli_close($conn);
} else {
    echo json_encode(array('msg' => 'Invalid request method', 'status' => 'Error'));
}
?>
