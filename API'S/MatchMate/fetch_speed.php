<?php
include 'config.php'; // Ensure this includes your database connection logic

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];

        // Fetch speed records for the user
        $query = "SELECT speedKPH, speedMPH, time_stamp FROM speed WHERE userId = '$userId'";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $speedRecords = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $speedRecords[] = $row; // Store each record in the array
            }
            echo json_encode(array('msg' => 'Speed records fetched successfully', 'status' => 'Success', 'data' => $speedRecords));
        } else {
            echo json_encode(array('msg' => 'Error fetching speed records', 'status' => 'Error'));
        }
    } else {
        echo json_encode(array('msg' => 'User not logged in', 'status' => 'Error'));
    }

    mysqli_close($conn);
} else {
    echo json_encode(array('msg' => 'Invalid request method', 'status' => 'Error'));
}
?>
