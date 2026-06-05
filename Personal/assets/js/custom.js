// Grab elements
const submitButton = document.getElementById("submit");
const nameInput = document.getElementById("form-name");
const surnameInput = document.getElementById("form-surname");
const emailInput = document.getElementById("form-email");
const addressInput = document.getElementById("form-address");
const phoneInput = document.getElementById("form-phone");
const q1Input = document.getElementById("design_rating");
const q2Input = document.getElementById("usability_rating");
const q3Input = document.getElementById("recommend_rating");
const resultBlock = document.getElementById("form-result");
const border = document.getElementById("form-result-title");
const successPopup = document.getElementById("success-popup");
const successPopupClose = document.getElementById("success-popup-close");
const contactForm = document.getElementById("contact-form");
// Submit form
function submitForm(event){
    event.preventDefault();

    if (!validate() || !validatePhoneField(phoneInput)) {
        return;
    }

    console.log(nameInput.value);
    console.log(surnameInput.value);
    console.log(emailInput.value);
    console.log(phoneInput.value);
    console.log(addressInput.value);
    console.log(`${nameInput.value} ${surnameInput.value}: ${getAvg()}`);
    border.style.borderColor = "#222";
    resultBlock.innerHTML = `
        <p><strong>Vardas:</strong> ${nameInput.value}</p>
        <p><strong>Pavardė:</strong> ${surnameInput.value}</p>
        <p><strong>El. paštas:</strong> ${emailInput.value}</p>
        <p><strong>Tel. numeris:</strong> ${phoneInput.value}</p>
        <p><strong>Adresas:</strong> ${addressInput.value}</p>`;

    contactForm.reset();
    showSuccessPopup();
}

function showError(input, message) {
    input.style.border = "2px solid red";

    let error = input.parentElement.querySelector(".error-message");

    if (!error) {
        error = document.createElement("small");
        error.className = "error-message";
        error.style.color = "black";
        error.style.display = "block";
        error.style.marginTop = "5px";
        input.parentElement.appendChild(error);
    }

    error.textContent = message;
}

function clearError(input) {
    input.style.border = "";

    const error = input.parentElement.querySelector(".error-message");
    if (error) {
        error.remove();
    }
}

function validateTextField(input, fieldName) {
    if (input.value.trim() === "") {
        showError(input, `${fieldName} negali būti tuščias`);
        return false;
    }

    clearError(input);
    return true;
}

function validateNameField(input, fieldName) {
    const lettersOnly = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;

    if (input.value.trim() === "") {
        showError(input, `${fieldName} negali būti tuščias`);
        return false;
    }

    if (!lettersOnly.test(input.value.trim())) {
        showError(input, `${fieldName} turi būti sudarytas tik iš raidžių`);
        return false;
    }

    clearError(input);
    return true;
}

function validateEmailField(input) {
    if (input.value.trim() === "") {
        showError(input, "El. paštas negali būti tuščias");
        return false;
    }

    if (!input.checkValidity()) {
        showError(input, "Įveskite teisingą el. pašto adresą");
        return false;
    }

    clearError(input);
    return true;
}

function getPhoneDigits(value) {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("370")) {
        digits = digits.slice(3);
    }

    if (digits.startsWith("0")) {
        digits = digits.slice(1);
    }

    return digits.slice(0, 8);
}

function formatLithuanianPhone(input) {
    const digits = getPhoneDigits(input.value);

    let formatted = "+370";

    if (digits.length > 0) {
        formatted += " " + digits.slice(0, 3);
    }

    if (digits.length > 3) {
        formatted += " " + digits.slice(3, 8);
    }

    input.value = formatted;
}

function validatePhoneField(input) {
    const digits = getPhoneDigits(input.value);

    if (digits.length === 0) {
        showError(input, "Telefono numeris negali būti tuščias");
        return false;
    }

    if (!digits.startsWith("6")) {
        showError(input, "Lietuviškas mobilus numeris turi prasidėti skaičiumi 6");
        return false;
    }

    if (digits.length !== 8) {
        showError(input, "Telefono numeris turi būti formato +370 6xx xxxxx");
        return false;
    }

    clearError(input);
    return true;
}

function validate() {
    const isNameValid = validateNameField(nameInput, "Vardas");
    const isSurnameValid = validateNameField(surnameInput, "Pavardė");
    const isEmailValid = validateEmailField(emailInput);
    const isAddressValid = validateTextField(addressInput, "Adresas");
    const isPhoneValid = validatePhoneField(phoneInput);

    return isNameValid && isSurnameValid && isEmailValid && isAddressValid && isPhoneValid;
}

function showSuccessPopup() {
    successPopup.classList.add("show");
}

successPopupClose.addEventListener("click", function () {
    successPopup.classList.remove("show");
});

function getAvg(){
    const q1 = Number(q1Input.value);
    const q2 = Number(q2Input.value);
    const q3 = Number(q3Input.value);
    return ((q1+q2+q3)/3).toFixed(2);
}

nameInput.addEventListener("input", function () {
    validateNameField(nameInput, "Vardas");
});

surnameInput.addEventListener("input", function () {
    validateNameField(surnameInput, "Pavardė");
});

emailInput.addEventListener("input", function () {
    validateEmailField(emailInput);
});

addressInput.addEventListener("input", function () {
    validateTextField(addressInput, "Adresas");
});

phoneInput.addEventListener("input", function () {
    formatLithuanianPhone(phoneInput);
    validatePhoneField(phoneInput);
});

phoneInput.addEventListener("focus", function () {
    if (phoneInput.value.trim() === "") {
        phoneInput.value = "+370 ";
    }
});

submitButton.addEventListener("click", submitForm);