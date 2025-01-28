document.addEventListener("DOMContentLoaded", function () {
    loadSections();
    attachEventListeners();
});

// Loads previously saved sections from localStorage
function loadSections() {
    const sectionsContainer = document.getElementById("sections-container");
    sectionsContainer.innerHTML = "";

    const sectionKeys = Object.keys(localStorage).filter((key) => key.startsWith("sectionColor"));
    const sortedKeys = sectionKeys.sort((a, b) => parseInt(a.replace("sectionColor", "")) - parseInt(b.replace("sectionColor", "")));
    const sections = sortedKeys.map((key) => localStorage.getItem(key));

    if (sections.length === 0) {
        for (let i = 0; i < 5; i++) {
            addNewSection();
        }
    } else {
        sections.forEach((color, index) => {
            addNewSection(color);
        });
    }
}

// Adds a new section
function addNewSection(color = null) {
    const sectionsContainer = document.getElementById("sections-container");
    const newColor = color || getRandomColor(); // Generate color once
    const sectionIndex = document.querySelectorAll("section.flex.justify-center").length;

    const newSection = document.createElement("section");
    newSection.className = "section flex justify-center items-center h-32 space-y-4";
    newSection.style.backgroundColor = newColor;
    newSection.setAttribute('draggable', 'true');
    newSection.style.marginTop = "0";
    newSection.innerHTML = `
        <form class="flex items-center justify-between w-full"> 
            <div class="flex items-center">
                <button type="button" class="btnshadow copybtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-4 md:pt:2 lg:h-12 lg:w-12 lg:ml-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe14d;</span></button>
                <button type="button" class="btnshadow lockicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe897;</span></button>
                <button type="button" class="btnshadow dragicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xf71e;</span></button>
            </div>
            <div class="flex items-center ml-auto">
                <div class="lg:ml-4 flex flex-row items-center relative">
                    <input type="text" class="grow bg-slate-950/[.40] text-slate-50 placeholder-slate-300 h-8 w-28 mr-2 pr-2 pl-4 pb-2 pt-2 rounded-full sm:h-8 sm:w-28 sm:pt:2 md:h-10 md:w-64 md:pt:2 lg:h-12 lg:w-96 lg:pb-2 focus:outline-none text-sm sm:text-base md:text-base lg:text-xl" placeholder="#000000" value="${newColor}"/> 
                    <button type="button" class="refresh absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-slate-50 pb-1 pt-1 pr-4 lg:pb-0"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe627;</span></button>                
                </div>
                <button type="button" class="btnshadow closebtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 mr-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:mr-2 sm:pt:2 md:h-10 md:w-10 md:mr-4 md:pt:2 lg:h-12 lg:w-12 lg:mr-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe5cd;</span></button>
            </div>
        </form>
    `;
    sectionsContainer.appendChild(newSection);

    // Store the new section's color in local storage
    const newIndex = document.querySelectorAll('section.flex.justify-center').length - 1;
    localStorage.setItem(`sectionColor${newIndex}`, newColor);
    localStorage.setItem(`sectionLocked${sectionIndex}`, false);
}

// Generates a random hex color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
    
// Attach event listeners to all sections
function attachEventListeners() {
    const sections = document.querySelectorAll("section.flex.justify-center");
    sections.forEach((section) => attachEventListenersToSection(section));
}

// Attaches event listeners to specific section's buttons and input fields.
function attachEventListenersToSection(section) {
    const closeBtn = section.querySelector(".closebtn");
    const refreshBtn = section.querySelector(".refresh");
    const colorInput = section.querySelector("input[type='text']");
    const lockBtn = section.querySelector(".lockicon");

    closeBtn?.addEventListener("click", () => removeSection(section));
    refreshBtn?.addEventListener("click", () => refreshSectionColor(section));
    colorInput?.addEventListener("input", (event) => handleColorInput(event, section));
    lockBtn?.addEventListener("click", () => toggleLock(section));
}

// Makes the lockstate work properly with Generate button
function toggleLock(section) {
    const lockButton = section.querySelector(".lockicon");
    const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);

    // Toggle the "locked" class for the lock icon
    lockButton.classList.toggle("locked");

    // Get current state and update localStorage
    const isLocked = lockButton.classList.contains("locked");
    localStorage.setItem(`sectionLocked${sectionIndex}`, isLocked);
}

// Remove a section and update localStorage
function removeSection(section) {
    const sections = Array.from(document.querySelectorAll("section.flex.justify-center"));
    const currentSectionCount = sections.length;
    const sectionIndex = sections.indexOf(section);

    // Three sections check
    if (currentSectionCount <= 3) {
        alert("You cannot have less than three colors.");
        return;
    }

    // Remove from DOM and localStorage
    section.remove();
    localStorage.removeItem(`sectionColor${sectionIndex}`);

    // Re-index the remaining sections
    for (let i = sectionIndex + 1; i < currentSectionCount; i++) {
        const color = localStorage.getItem(`sectionColor${i}`);
        localStorage.setItem(`sectionColor${i - 1}`, color);
        localStorage.removeItem(`sectionColor${i}`);
    }

    // Update section count in localStorage
    const updatedSectionsCount = document.querySelectorAll("section.flex.justify-center").length;
    localStorage.setItem("sectionsCount", updatedSectionsCount);
}

// Refresh a section's color
function refreshSectionColor(section) {
    const lockButton = section.querySelector(".lockicon");
    const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section); // Get the section index

    // Lock Check
    if (lockButton && lockButton.classList.contains("locked")) {
        return;
    }

    // Generate new color and update background
    const newColor = getRandomColor();
    section.style.backgroundColor = newColor;

    // Check and display color input
    const colorInput = section.querySelector("input[type='text']");
    if (colorInput) {
        colorInput.value = newColor;
    }

    // Update localStorage
    localStorage.setItem(`sectionColor${sectionIndex}`, newColor);
}

// Handle color input change
function handleColorInput(event) {
    const inputField = event.target;
    const colorValue = inputField.value.trim();
    const hexRegex = /^#([0-9A-Fa-f]{6})$/;

    // Check if the value entered is a valid hex color
    if (hexRegex.test(colorValue)) {
        const section = inputField.closest("section");
        section.style.backgroundColor = colorValue;

        // Store the color in localStorage
        const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
        localStorage.setItem(`sectionColor${sectionIndex}`, colorValue);
    }
}

// Function to lock a color
function lockColor(index) {
    let colors = JSON.parse(localStorage.getItem("colors")) || [];
    colors[index].locked = true;
    localStorage.setItem("colors", JSON.stringify(colors));
    updateColorDisplay(index);
}

// Function to unlock a color
function unlockColor(index) {
    let colors = JSON.parse(localStorage.getItem("colors")) || [];
    colors[index].locked = false;
    localStorage.setItem("colors", JSON.stringify(colors));
    updateColorDisplay(index);
}

// Function to generate colors (locked colors remain unchanged)
function generateColors() {
    const sections = document.querySelectorAll("section.flex.justify-center");

    sections.forEach((section, index) => {
        const isLocked = localStorage.getItem(`sectionLocked${index}`) === "true";
        const storedColor = localStorage.getItem(`sectionColor${index}`);

        // Generate new color and update background
        if (!isLocked) {
            const newColor = getRandomColor();
            section.style.backgroundColor = newColor;

            // Update localStorage
            const colorInput = section.querySelector("input[type='text']");
            colorInput.value = newColor;
            localStorage.setItem(`sectionColor${index}`, newColor);

        // Keep stored color for locked sections
        } else if (storedColor) {
            section.style.backgroundColor = storedColor;
        }
    });
}

// Update color display based on localStorage
function updateColorDisplay() {
    const colors = JSON.parse(localStorage.getItem("colors")) || [];
    colors.forEach((color, index) => {
        const colorElement = document.querySelector(`#color-${index}`);
        colorElement.style.backgroundColor = color.value;

        // Update the display to show whether the color is locked or not
        if (color.locked) {
            colorElement.classList.add("locked");
        } else {
            colorElement.classList.remove("locked");
        }
    });
}

//Drag and Drop
document.addEventListener("DOMContentLoaded", function() {
    const sectionsContainer = document.querySelector("main");
    let draggedSection = null;

    sectionsContainer.addEventListener("dragstart", function(event) {
        draggedSection = event.target.closest("section");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", draggedSection.innerHTML);
        setTimeout(() => {
            draggedSection.style.display = "none";
        }, 0);
    });

    sectionsContainer.addEventListener("dragover", function(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        const targetSection = event.target.closest("section");
        if (targetSection && targetSection !== draggedSection) {
            const bounding = targetSection.getBoundingClientRect();
            const offset = bounding.y + bounding.height / 2;
            if (event.clientY - offset > 0) {
                targetSection.style.borderBottom = "2px dashed #ccc";
                targetSection.style.borderTop = "";
            } else {
                targetSection.style.borderTop = "2px dashed #ccc";
                targetSection.style.borderBottom = "";
            }
        }
    });

    sectionsContainer.addEventListener("dragleave", function(event) {
        const targetSection = event.target.closest("section");
        if (targetSection) {
            targetSection.style.borderTop = "";
            targetSection.style.borderBottom = "";
        }
    });

    sectionsContainer.addEventListener("drop", function(event) {
        event.preventDefault();
        const targetSection = event.target.closest("section");
        if (targetSection && targetSection !== draggedSection) {
            const bounding = targetSection.getBoundingClientRect();
            const offset = bounding.y + bounding.height / 2;
            if (event.clientY - offset > 0) {
                targetSection.style.borderBottom = "";
                targetSection.parentNode.insertBefore(draggedSection, targetSection.nextSibling);
            } else {
                targetSection.style.borderTop = "";
                targetSection.parentNode.insertBefore(draggedSection, targetSection);
            }
            updateLocalStorage();
        }
        draggedSection.style.display = "flex";
        draggedSection = null;
    });

    sectionsContainer.addEventListener("dragend", function(event) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.style.borderTop = "";
            section.style.borderBottom = "";
        });
        draggedSection.style.display = "flex";
        draggedSection = null;
    });

    function updateLocalStorage() {
        const sections = document.querySelectorAll("section.flex.justify-center");
        sections.forEach((section, index) => {
            const color = rgbToHex(section.style.backgroundColor).toUpperCase();
            localStorage.setItem(`sectionColor${index}`, color);
            const colorInput = section.querySelector("input[type='text']");
            if (colorInput) {
                colorInput.value = color;
            }
        });
    }
    
    //Hex RGB Bug Fix
    function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (result) {
            return "#" + result.slice(0, 3).map(x => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }).join("");
        }
        return rgb;
    }
});