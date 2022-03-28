let inputEmailReference = document.querySelector("#inputEmail");
let inputPasswordReference = document.querySelector("#inputPassword");
let formReference = document.querySelector("form");
let buttonReference = document.querySelector("button");

function validateIndex() {

    formReference.checkValidity() ? buttonReference.disabled = false : buttonReference.disabled = true;

}

inputEmailReference.onchange = validateIndex;
inputPasswordReference.onchange = validateIndex;