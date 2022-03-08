const form = document.querySelector(".signup form"),
    continueBtn = form.querySelector(".button input"),
    errorText = form.querySelector(".error-txt");

console.log("signup.js connected");

form.onsubmit = (e) => {
    e.preventDefault(); //prevents form submitting
}

continueBtn.onclick = () => {
    //starting up ajax
    let xhr = new XMLHttpRequest(); //creating xml object
    xhr.open("POST", "php/signup.php", true);
    xhr.onload = () => {
        //this sets the address url of the php file inside xhr.open()
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if (data == "success") {
                    location.href = "users.php"
                } else {
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    }
    //sending the form data through ajax to php 

    console.log("data attempting to send")
    let formData = new FormData(form); //this creates the formData object


    xhr.send(formData); //sending form data
};
