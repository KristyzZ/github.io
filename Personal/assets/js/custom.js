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
// Submit form
function submitForm(event){
    event.preventDefault();

    if (!nameInput.checkValidity() || !surnameInput.checkValidity() || !emailInput.checkValidity() || !phoneInput.checkValidity() || !addressInput.checkValidity()) {
        event.target.form.reportValidity();
        return;
    }

    console.log(nameInput.value);
    console.log(surnameInput.value);
    console.log(emailInput.value);
    console.log(addressInput.value);
    console.log(phoneInput.value);
    console.log(`${nameInput.value} ${surnameInput.value}: ${getAvg()}`);
    border.style.borderColor = "#222";
    resultBlock.innerHTML = `
        <p><strong>Vardas:</strong> ${nameInput.value}</p>
        <p><strong>Pavardė:</strong> ${surnameInput.value}</p>
        <p><strong>El. paštas:</strong> ${emailInput.value}</p>
        <p><strong>Tel. numeris:</strong> ${phoneInput.value}</p>
        <p><strong>Adresas:</strong> ${addressInput.value}</p>`;

    showSuccessPopup();
}

function showSuccessPopup() {
    successPopup.classList.add("show");

    setTimeout(function () {
        successPopup.classList.remove("show");
    }, 3000);
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

submitButton.addEventListener("click", submitForm);