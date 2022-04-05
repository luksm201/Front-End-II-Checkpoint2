let inputEmailReference = document.querySelector("#inputEmail");
let inputPasswordReference = document.querySelector("#inputPassword");
let formReference = document.querySelector("form");
let buttonReference = document.querySelector("button");

function validateForm() {

    formReference.checkValidity() ? buttonReference.classList.remove("disabled") : buttonReference.classList.add("disabled");

}

function validateField(event) {

    event.target.checkValidity() ? event.target.classList.remove("invalid") : event.target.classList.add("invalid");

}

inputEmailReference.oninput = validateForm;
inputPasswordReference.oninput = validateForm;
inputEmailReference.onchange = validateField;
inputPasswordReference.onchange = validateField;