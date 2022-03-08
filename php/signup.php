<?php
    session_start();
    include_once "config.php";
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){
        //valid email check 
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){ //if email is valid
            //check if email is already in the database 
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
            if(mysqli_num_rows($sql) > 0){ //send message if email exists
                echo "$email - already exists in the database";
            }else{
                //lets check user upload file or not 
                if(isset($_FILES['image'])){//if file is uploaded ($_FILES[] returns an array with file name,type, error, file size, tmp_name)
                    $img_name = $_FILES['image']['name']; //this gets image name
                    $img_type = $_FILES['image']['type']; //this grabs img type
                    $img_name = $_FILES['image']['tmp_name']; //this grabs a temp name for the file to save in the db 
                    
                    //try and get the last extention png, jpg
                    $img_explode = explode('.', $img_name);
                    $img_ext = end($img_explode);

                    $extensions = ['png', 'jpeg', 'jpg'];// might add more file options later 
                    if(in_array($img_ext, $extensions) === true){
                        $time = time(); //gets current time
                        $new_img_name = $time.$img_name;

                        if(move_uploaded_file($tmp_name, "images/".$new_img_name)){
                            $status = "Active now";  // if user signs up correctly they status will now be active
                            $random_id = rand(time(), 10000000); //create random id or users

                            //attempting to insert data inside the table 
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status
                                                VALUES ({$random_id}, '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");
                            if($sql2){ //if data is inserted
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                if(mysqli_num_rows($sql3) > 0){
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id']; //this should use the session we used the unique_id in other php file
                                    echo "success";
                                }
                            } else {
                                echo "Somthing went wrong!";
                            }
                        }
                    }else{
                        echo "please select a jpeg, jpg or png file!";
                    }

                }else{
                    echo "please select an image file"
                }
            }
        }else{
            echo "$email - this is not a valid email!"
        }

    } else{
        echo "fill in all fields!"
    }
?>