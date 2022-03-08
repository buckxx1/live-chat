<?php
    $conn = mysqli_connect("localhost", "root", "", "live-chat");
    if(!$conn){
        echo "live-chat Database connected" . mysqli_connect_error();
    } 
?>