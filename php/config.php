<?php
// this was the development connnection 
    //$conn = mysqli_connect("localhost", "root", "", "live-chat");
    //if(!$conn){
    //    echo "live-chat Database connected" . mysqli_connect_error//();
    //} 

    //remote deployed connection 
    $conn = mysqli_connect("remotemysql.com", "p6AoBnRj5r", "eAACPt6lMr", "p6AoBnRj5r");
    if(!$conn){
        echo "live-chat Database connected" . mysqli_connect_error();
    } 
?>