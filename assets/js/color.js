document.getElementById("generateButton").addEventListener("click", function () {
    window.location.href = "generator.html";  
});

// Function to generate a random hex color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to set the section's background color
function setRandomSectionColor() {
    const sections = document.querySelectorAll("section.flex.justify-center");

    sections.forEach((section, index) => {
        const colorInput = section.querySelector("input[type='text']");
        const sectionKey = `sectionColor${index}`;

        if (section && colorInput) {
            let storedColor = localStorage.getItem(sectionKey);

            if (!storedColor) {
                storedColor = getRandomColor();
                localStorage.setItem(sectionKey, storedColor);
            }

            section.style.backgroundColor = storedColor;
            colorInput.value = storedColor;
        } else {
            console.error("Section or color input not found.");
        }
    });
}

// Function to refresh the section's color
function refreshSectionColor(event) {
    const section = event.target.closest("section.flex.justify-center");
    const colorInput = section.querySelector("input[type='text']");
    const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
    const sectionKey = `sectionColor${sectionIndex}`;

    if (section && colorInput) {
        const newColor = getRandomColor();
        section.style.backgroundColor = newColor;
        colorInput.value = newColor;
        localStorage.setItem(sectionKey, newColor);
    } else {
        console.error("Section or color input not found.");
    }
}

// Function to validate and update the background color based on input
function handleColorInput(event) {
    const section = event.target.closest("section.flex.justify-center");
    const colorInput = section.querySelector("input[type='text']");
    const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
    const sectionKey = `sectionColor${sectionIndex}`;

    if (section && colorInput) {
        const colorValue = colorInput.value.trim();
        const hexRegex = /^#([0-9A-Fa-f]{6})$/;

        if (hexRegex.test(colorValue)) {
            section.style.backgroundColor = colorValue;
            localStorage.setItem(sectionKey, colorValue);
        } else if (colorValue === "") {
            setRandomSectionColor();
        }
    }
}

// Initialize the functions
window.onload = function () {
    setRandomSectionColor();

    // Event listener to the refresh button
    const refreshButtons = document.querySelectorAll(".refresh");
    refreshButtons.forEach(button => {
        button.addEventListener("click", refreshSectionColor);
    });

    // Event listener to handle hex code input change
    const colorInputs = document.querySelectorAll("input[type='text']");
    colorInputs.forEach(input => {
        input.addEventListener("input", handleColorInput);
    });
};