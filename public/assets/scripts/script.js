
const apiUrl = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function () {
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    console.log(emailError);
    console.log(passwordError);

    emailError.innerHTML = ''
    passwordError.innerHTML = ''

});



document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let isEmailValid = validateEmail(email);
    let isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
        // api call from here
        fetch(`${apiUrl}/auth/login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json' // Ensure correct content type
            },
            body:JSON.stringify({ username: email,password:password })
        })
            .then(response => response.json())
            .then(data=>{
                if(data.message=='success' && data.status==200)
                {
                    window.location.href='http://localhost:3000/private'
                }
            
            })
    }
    else {
        alert('Error occured')
    }
});

function validateEmail(email) {
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.style.display = "block";
        emailError.innerHTML = 'Invalid email address'
        return false;
    } else {
        emailError.style.display = "none";
        return true;
    }
}

function validatePassword(password) {
    let passwordError = document.getElementById("passwordError");

    if (password.length < 6) {
        passwordError.style.display = "block";
        passwordError.innerHTML = 'Invalid password'
        return false;
    } else {
        passwordError.style.display = "none";
        return true;
    }
}