//Event Listener to the back button
const redirectButton = document.getElementById("redirectButton");

redirectButton.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirects to index.html
});

document.addEventListener("DOMContentLoaded", function() {

// Event listener to handle hex code input change
const colorInputs = document.querySelectorAll("input[type='text']");
colorInputs.forEach(input => {
     input.addEventListener("input", handleColorInput);
});

// Event Listener to copy button
const copyButtons = document.querySelectorAll(".copybtn");
copyButtons.forEach(button => {
    button.addEventListener("click", function() {
        const inputField = this.closest("form").querySelector("input[type='text']");
        if (inputField) {
            inputField.select();
            inputField.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(inputField.value).then(() => {
                alert("Color Copied!");
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    });
});

});