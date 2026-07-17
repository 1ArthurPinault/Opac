const loginSwitch = document.getElementById("login-switch");
const signupSwitch = document.getElementById("signup-switch");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const authMessage = document.getElementById("auth-message");



function showLogin(){


    loginSwitch.classList.add("active");

    signupSwitch.classList.remove("active");


    loginForm.classList.add("active");

    signupForm.classList.remove("active");


    authMessage.textContent = "";


}





function showSignup(){


    signupSwitch.classList.add("active");

    loginSwitch.classList.remove("active");


    signupForm.classList.add("active");

    loginForm.classList.remove("active");


    authMessage.textContent = "";


}





loginSwitch.addEventListener("click",()=>{


    showLogin();


});





signupSwitch.addEventListener("click",()=>{


    showSignup();


});









const forms = document.querySelectorAll(".auth-form");



forms.forEach(form => {


    form.addEventListener("submit",(event)=>{


        event.preventDefault();



        if(form.id === "login-form"){


            authMessage.textContent =

            "You are successfully logged in to Opac 🚀";


        }



        else {


            authMessage.textContent =

            "Your Opac account has been created successfully 🚀";


        }




        form.reset();




        setTimeout(()=>{


            authMessage.textContent = "";


        },5000);



    });


});









// Navbar scroll effect (same logic as landing)



window.addEventListener("scroll",()=>{


    const header = document.querySelector("header");


    if(header){


        if(window.scrollY > 40){


            header.classList.add("scrolled");


        }


        else{


            header.classList.remove("scrolled");


        }


    }


});