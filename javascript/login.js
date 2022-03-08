const form = document.querySelector(".login form"),
    continueBtn = form.querySelector(".button input"),
    errorText = form.querySelector(".error-txt");


form.onsubmit = (e) => {
    e.preventDefault(); //prevents form submitting
}

continueBtn.onclick = () => {
    //starting up ajax
    let xhr = new XMLHttpRequest(); //creating xml object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = () => {
        //this sets the address url of the php file inside xhr.open()
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data);
                if (data == "success") {
                    location.href = "users.php"
                } else {
                    errorText.style.display = "block";
                    errorText.textContent = data;

                }
            }
        }
    }
    //sending the form data through ajax to php 
    let formData = new FormData(form); //this creates the formData object


    xhr.send(formData); //sending form data
};

console.log("login.js connected");