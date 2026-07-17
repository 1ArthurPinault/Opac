const form = document.getElementById("gdpr-form");
const formCard = document.getElementById("form-card");
const successPanel = document.getElementById("success-panel");

function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateTextField(id, message){

    const input = document.getElementById(id);
    const fieldWrap = input.closest(".field");
    const errorText = fieldWrap.querySelector(".error-text");

    const isValid = input.value.trim() !== "";

    fieldWrap.classList.toggle("has-error", !isValid);
    input.classList.toggle("error", !isValid);
    errorText.textContent = message;

    return isValid;

}

function validateEmailField(id, requiredMessage, formatMessage){

    const input = document.getElementById(id);
    const fieldWrap = input.closest(".field");
    const errorText = fieldWrap.querySelector(".error-text");

    const value = input.value.trim();
    let isValid = true;
    let message = requiredMessage;

    if(value === ""){
        isValid = false;
    } else if(!isValidEmail(value)){
        isValid = false;
        message = formatMessage;
    }

    fieldWrap.classList.toggle("has-error", !isValid);
    input.classList.toggle("error", !isValid);
    errorText.textContent = message;

    return isValid;

}

function validateConfirmCheckbox(){

    const checkbox = document.getElementById("confirm-identity");
    const fieldWrap = checkbox.closest(".checkbox-field");

    const isValid = checkbox.checked;

    fieldWrap.classList.toggle("has-error", !isValid);

    return isValid;

}

function generateReference(){
    const number = Math.floor(100000 + Math.random() * 900000);
    return "GDPR-" + number;
}

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const nameValid = validateTextField("full-name", "Please enter your full name.");
    const emailValid = validateEmailField("account-email", "Please enter the email linked to your account.", "Please enter a valid email address.");
    const confirmValid = validateConfirmCheckbox();

    const allValid = nameValid && emailValid && confirmValid;

    if(allValid){

        const requestType = document.getElementById("request-type").value;
        const reference = generateReference();

        successPanel.querySelector(".ref-number").textContent = reference;
        successPanel.querySelector(".request-type-label").textContent = requestType;

        formCard.classList.add("hidden-form");
        successPanel.classList.add("show");

    }

});
