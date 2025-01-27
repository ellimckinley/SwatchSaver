//Event Listener to the generate button
document.getElementById("generateButton").addEventListener("click", function () {
    window.location.href = "generator.html";  
});  

document.addEventListener("DOMContentLoaded", () => {
    const enterColorValue = document.querySelector("#enterColorValue");
    const paletteSizeModal = document.querySelector("#paletteSizeModal");
    const paletteSizeSelect = document.querySelector("#paletteSizeSelect");
    const paletteSizeError = document.querySelector("#paletteSizeError");
    const nextToHexInput = document.querySelector("#nextToHexInput");
    const cancelPaletteSize = document.querySelector("#cancelPaletteSize");
    const hexInputModal = document.querySelector("#hexInputModal");
    const hexInputsContainer = document.querySelector("#hexInputsContainer");
    const hexInputError = document.querySelector("#hexInputError");
    const confirmHexInput = document.querySelector("#confirmHexInput");
    const cancelHexInput = document.querySelector("#cancelHexInput");
    let selectedPaletteSize = 0;
  
  // Open Palette Size Modal
  enterColorValue.addEventListener("click", () => {
    paletteSizeModal.classList.remove("hidden");
  });

  // Close Palette Size Modal
  cancelPaletteSize.addEventListener("click", () => {
    paletteSizeModal.classList.add("hidden");
  });

  // Proceed to Hex Input Modal
  nextToHexInput.addEventListener("click", () => {
    selectedPaletteSize = parseInt(paletteSizeSelect.value, 10);
    if (!selectedPaletteSize || selectedPaletteSize < 3 || selectedPaletteSize > 7) {
      paletteSizeError.classList.remove("hidden");
      return;
    }
    paletteSizeError.classList.add("hidden");
    paletteSizeModal.classList.add("hidden");
    hexInputModal.classList.remove("hidden");

    // Clear any previous input fields before generating new ones
    hexInputsContainer.innerHTML = "";

    // Generate input fields for the selected palette size
    for (let i = 0; i < selectedPaletteSize; i++) {
      hexInputsContainer.innerHTML += `
        <input type="text" class="hex-input border p-2 w-full mt-2" placeholder="Enter Hex Code #${i + 1}">
      `;
    }
 });

  // Close Hex Input Modal
  cancelHexInput.addEventListener("click", () => {
    hexInputModal.classList.add("hidden");
  });

  // Validate and Confirm Hex Codes
  confirmHexInput.addEventListener("click", () => {
    const hexInputs = document.querySelectorAll(".hex-input");
    let isValid = false;
    const hexRegex = /^#([A-Fa-f0-9]{6})$/;
    hexInputs.forEach((input) => {
      if (hexRegex.test(input.value.trim())) {
        isValid = true;
      }
    });
    if (!isValid) {
      hexInputError.classList.remove("hidden");
      return;
    }
    hexInputError.classList.add("hidden");
    hexInputModal.classList.add("hidden");

    // Redirect to generator page with selected hex codes and palette size
    const hexCodes = Array.from(hexInputs)
      .map((input) => input.value.trim())
      .filter((code) => hexRegex.test(code));

    // Pass palette data to the generator page via query parameters or session storage
    const query = `?paletteSize=${selectedPaletteSize}&hexCodes=${encodeURIComponent(
      JSON.stringify(hexCodes)
    )}`;
    window.location.href = `custom.html${query}`;
  });
});

// Function to create sections based on the selected palette size
function createSectionsBasedOnSelection(size) {
  const sectionContainer = document.querySelector("#section-container"); // Make sure this container exists
  sectionContainer.innerHTML = ""; // Clear any existing sections

  for (let i = 0; i < size; i++) {
    const section = document.createElement("div");
    section.classList.add("section", "mt-2", "p-4", "border", "rounded", "flex", "justify-between");
    section.innerHTML = `
      <div class="section-color" style="background-color: #FFFFFF;"></div>
      <span>Color #${i + 1}</span>
    `;
    sectionContainer.appendChild(section);
  }
}
