console.log("chat.js connected");

const from = document.querySelector(".typing-area"),
    inputField = form.querySelector(".input-field"),
    sendBtn = form.querySelector("button"),
    chatBox = document.querySelector(".chat-box")

form.onsubmit = (e) => {
    e.preventDefault();  //preventing the default form from submitting 
}


sendBtn.onclick = () => {
    //starting up ajax
    let xhr = new XMLHttpRequest(); //creating xml object
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = () => {
        //this sets the address url of the php file inside xhr.open()
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; //this should reseet the field to an empty box after sending data to db
                scrollToBottom();
            }
        }
    }
    //sending the form data through ajax to php 
    let formData = new FormData(form); //this creates the formData object
    xhr.send(formData); //sending form data
}

//stopping the scroll to bottom function when user tries to scroll up in chat box
chatBox.onmouseenter = () => {
    chatBox.classList.add("active");
}

chatBox.onmouseleave = () => {
    chatBox.classList.remove("active");
}


setInterval(() => {
    //starting ajax here
    let xhr = new XMLHttpRequest(); //creating XML object 
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = () => {
        if (xhr.readystate === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                chatBox.innerHTML = data;
                if (!chatBox.classList.contains("active")) { //should fix the scrolling when unintended issue 
                    scrollToBottom();
                }
            }
        }
    }
    //sending the form data through ajax to php 
    let formData = new FormData(form); //this creates the formData object
    xhr.send(formData); //sending form data

}, 500); //this should run after 500 ms 


//auto scroll function 

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight
}