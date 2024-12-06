<?php
// session_start();
include 'config.php'; // Ensure this includes your database connection logic

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents('php://input'), true);
            $speedKph = floatval($data['speed_kph']);
            $speedMph = floatval($data['speed_mph']);
            // $currentDateTime = date("Y-m-d H:i:s");

            // Insert the speed data into the database
            $insertQuery = "INSERT INTO `speed` (`userId`, `speedKPH`, `speedMPH`) VALUES ('$userId', '$speedKph', '$speedMph')";
            $result = mysqli_query($conn, $insertQuery);

            if ($result) {
                echo json_encode(array('msg' => 'Speed logged successfully', 'status' => 'Success'));
            } else {
                echo json_encode(array('msg' => 'Error logging speed', 'status' => 'Error'));
            }
        } else {
            echo json_encode(array('msg' => 'Invalid data', 'status' => 'Error'));
        }
    } else {
        echo json_encode(array('msg' => 'User not logged in', 'status' => 'Error'));
    }

mysqli_close($conn);
?>
