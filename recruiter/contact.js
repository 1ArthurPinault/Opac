const form = document.getElementById("contact-form");
const formCard = document.getElementById("form-card");
const successPanel = document.getElementById("success-panel");

const fields = {
    "first-name": { required: true, message: "Please enter your first name." },
    "last-name": { required: true, message: "Please enter your last name." },
    "work-email": { required: true, email: true, message: "Please enter your work email.", emailMessage: "Please enter a valid email address." },
    "company": { required: true, message: "Please enter your company name." },
    "message": { required: true, minLength: 20, message: "Please tell us a bit more (at least 20 characters)." }
};

function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(id, config){

    const input = document.getElementById(id);
    const fieldWrap = input.closest(".field");
    const errorText = fieldWrap.querySelector(".error-text");

    const value = input.value.trim();
    let isValid = true;
    let message = config.message;

    if(config.required && value === ""){
        isValid = false;
    } else if(config.email && !isValidEmail(value)){
        isValid = false;
        message = config.emailMessage;
    } else if(config.minLength && value.length < config.minLength){
        isValid = false;
    }

    fieldWrap.classList.toggle("has-error", !isValid);
    input.classList.toggle("error", !isValid);
    errorText.textContent = message;

    return isValid;

}

function validateForm(){

    let allValid = true;

    Object.keys(fields).forEach(id => {
        const valid = validateField(id, fields[id]);
        if(!valid){ allValid = false; }
    });

    return allValid;

}

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const valid = validateForm();

    if(valid){

        const firstName = document.getElementById("first-name").value.trim();

        formCard.classList.add("hidden-form");
        successPanel.classList.add("show");
        successPanel.querySelector(".success-name").textContent = firstName;

    }

});
