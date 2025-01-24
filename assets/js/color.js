document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section.flex.justify-center");

    sections.forEach((section, index) => {
        // Find the text input within the current section nad create unique key
        const colorInput = section.querySelector("input[type='text']");
        const sectionKey = `sectionColor${index}`;

        if (section && colorInput) {
            // Retrieve the stored color from local storage
            let storedColor = localStorage.getItem(sectionKey);
            
            // If no color is stored, generate a random color and store it
            if (!storedColor) {
                storedColor = getRandomColor();
                localStorage.setItem(sectionKey, storedColor);
            }

            // Apply the stored color to the section's background and input value
            section.style.backgroundColor = storedColor;
            colorInput.value = storedColor;
        }
    });

    // Attach event listeners to existing sections
    attachEventListeners();

    // Event listener to handle hex code input change
    const colorInputs = document.querySelectorAll("input[type='text']");
    colorInputs.forEach(input => {
        input.addEventListener("input", handleColorInput);
    });

    // Event Listener to close button
    const closeButtons = document.querySelectorAll(".closebtn");
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            event.preventDefault();
            const section = this.closest("section.flex.justify-center");
            if (section) {
                section.remove();
                updateSections();
            }
        });
    });

    // Event Listener to add color button
    const addColorButton = document.querySelector(".btndark");
    addColorButton.addEventListener("click", function() {
        event.preventDefault();
        const sections = document.querySelectorAll("section.flex.justify-center");
        if (sections.length >= 7) {
            alert("You cannot add more than seven sections.");
        } else {
            addNewSection();
        }
    });

    // Initial update of sections
    updateSections();
}); // <-- Closing the DOMContentLoaded event listener

function loadSectionsFromLocalStorage() {
    const sectionsContainer = document.querySelector("main");
    let index = 0;
    while (true) {
        const sectionKey = `sectionColor${index}`;
        const color = localStorage.getItem(sectionKey);
        if (!color) break;

        const newSection = document.createElement("section");
        newSection.className = "section flex justify-center items-center h-32 space-y-4";
        newSection.innerHTML = `
            <form class="flex items-center justify-between w-full"> 
                <div class="flex items-center">
                    <button type="button" class="btnshadow copybtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-4 md:pt:2 lg:h-12 lg:w-12 lg:ml-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe14d;</span></button>
                    <button type="button" class="btnshadow lockicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe897;</span></button>
                    <button type="button" class="btnshadow dragicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xf71e;</span></button>
                </div>
                <div class="flex items-center ml-auto">
                    <div class="lg:ml-4 flex flex-row items-center relative">
                        <input type="text" class="grow bg-slate-950/[.40] text-slate-50 placeholder-slate-300 h-8 w-28 mr-2 pr-2 pl-4 pb-2 pt-2 rounded-full sm:h-8 sm:w-28 sm:pt:2 md:h-10 md:w-64 md:pt:2 lg:h-12 lg:w-96 lg:pb-2 focus:outline-none" placeholder="#000000" value="${color}"/> 
                        <button type="button" class="refresh absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-slate-50 pb-1 pt-1 pr-4 lg:pb-0"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe627;</span></button>                
                    </div>
                    <button type="button" class="btnshadow closebtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 mr-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:mr-2 sm:pt:2 md:h-10 md:w-10 md:mr-4 md:pt:2 lg:h-12 lg:w-12 lg:mr-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe5cd;</span></button>
                </div>
            </form>
        `;
        newSection.style.backgroundColor = color;
        newSection.style.marginTop = "0";
        sectionsContainer.appendChild(newSection);

        index++;
    }

    attachEventListeners();
}

// Function to add a new section
function addNewSection() {
    const sectionsContainer = document.querySelector("main");
    const newSection = document.createElement("section");
    newSection.className = "section flex justify-center items-center h-32 space-y-4";
    const newColor = getRandomColor();
    newSection.innerHTML = `
        <form class="flex items-center justify-between w-full"> 
            <div class="flex items-center">
                <button type="button" class="btnshadow copybtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-4 md:pt:2 lg:h-12 lg:w-12 lg:ml-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe14d;</span></button>
                <button type="button" class="btnshadow lockicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe897;</span></button>
                <button type="button" class="btnshadow dragicon bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 ml-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:ml-2 sm:pt:2 md:h-10 md:w-10 md:ml-2 md:pt:2 lg:h-12 lg:w-12 lg:ml-2 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xf71e;</span></button>
            </div>
            <div class="flex items-center ml-auto">
                <div class="lg:ml-4 flex flex-row items-center relative">
                    <input type="text" class="grow bg-slate-950/[.40] text-slate-50 placeholder-slate-300 h-8 w-28 mr-2 pr-2 pl-4 pb-2 pt-2 rounded-full sm:h-8 sm:w-28 sm:pt:2 md:h-10 md:w-64 md:pt:2 lg:h-12 lg:w-96 lg:pb-2 focus:outline-none" placeholder="#000000" value="${newColor}"/> 
                    <button type="button" class="refresh absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-slate-50 pb-1 pt-1 pr-4 lg:pb-0"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe627;</span></button>                
                </div>
                <button type="button" class="btnshadow closebtn bg-slate-950/[.40] text-slate-300 hover:text-slate-50 h-8 w-8 mr-2 pr-2 pt-1 pl-2 pb-1 rounded-full sm:h-8 sm:w-8 sm:mr-2 sm:pt:2 md:h-10 md:w-10 md:mr-4 md:pt:2 lg:h-12 lg:w-12 lg:mr-4 lg:pt:2"><span class="material-symbols-outlined text-sm sm:text-base md:text-base lg:text-xl">&#xe5cd;</span></button>
            </div>
        </form>
    `;
    newSection.style.backgroundColor = newColor;
    newSection.style.marginTop = "0";
    sectionsContainer.appendChild(newSection);

    // Store the new section's color in local storage
    const sectionIndex = document.querySelectorAll("section.flex.justify-center").length - 1;
    const sectionKey = `sectionColor${sectionIndex}`;
    localStorage.setItem(sectionKey, newColor);
    
    attachEventListeners();
}

// Function to attach event listeners to buttons
function attachEventListeners() {
    // Event listener to the refresh button
    const refreshButtons = document.querySelectorAll(".refresh");
    refreshButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.addEventListener("click", refreshSectionColor);
        newButton.addEventListener("click", refreshSectionColor);
    });


    // Event Listener to lock button
    const lockButtons = document.querySelectorAll(".lockicon");
    lockButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default form submission
            const inputField = this.closest("form").querySelector("input[type='text']");
            const refreshButton = this.closest("form").querySelector(".refresh");
            if (inputField && refreshButton) {
                if (inputField.disabled) {
                    inputField.disabled = false;
                    refreshButton.disabled = false;
                    inputField.classList.remove("text-slate-500");
                    inputField.classList.add("text-slate-300");
                    refreshButton.classList.remove("text-slate-500");
                    refreshButton.classList.add("text-slate-300");
                    this.querySelector("span").innerHTML = "&#xe897;";
                } else {
                    inputField.disabled = true;
                    refreshButton.disabled = true;
                    inputField.classList.remove("text-slate-300");
                    inputField.classList.add("text-slate-500");
                    refreshButton.classList.remove("text-slate-300", "hover:text-slate-50");
                    refreshButton.classList.add("text-slate-500");
                    this.querySelector("span").innerHTML = "&#xe898;"; // Lock icon
                }
            }
        });
    });

    // Event Listener to copy button
    const copyButtons = document.querySelectorAll(".copybtn");
    copyButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener("click", function(event) {
            event.preventDefault();
            const inputField = this.closest("form").querySelector("input[type='text']");
            if (inputField) {
                inputField.select();
                inputField.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(inputField.value).then(() => {
                    alert("Color Copied!");
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

     // Event listener to handle hex code input change
     const colorInputs = document.querySelectorAll("input[type='text']");
     colorInputs.forEach(input => {
        const newInput = input.cloneNode(true);
        input.addEventListener("input", handleColorInput);
        newInput.addEventListener("input", handleColorInput);
     });

     // Event Listener to close button
    const closeButtons = document.querySelectorAll(".closebtn");
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const section = this.closest("section");
            const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
            const sectionKey = `sectionColor${sectionIndex}`;
            localStorage.removeItem(sectionKey);
            section.remove();
        });
    });
}

// Function to generate a random hex color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

// Initial update of sections
updateSections();

// Function to update sections
// function updateSections() {
//     const sections = document.querySelectorAll("section.flex.justify-center");
//     if (sections.length < 3) {
//         alert("You cannot have less than three sections.");
//         addNewSection();
//     }
//     sections.forEach((section, index) => {
//         const colorInput = section.querySelector("input[type='text']");
//         const sectionKey = `sectionColor${index}`;
//         if (colorInput) {
//             colorInput.setAttribute("data-section-index", index);
//             localStorage.setItem(sectionKey, colorInput.value);
//         }
//     });
// }

// // Function to generate a random hex color
// function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// // Function to refresh the section's color
// function refreshSectionColor(event) {
//     const section = event.target.closest("section.flex.justify-center");
//     const colorInput = section.querySelector("input[type='text']");
//     const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
//     const sectionKey = `sectionColor${sectionIndex}`;

//     if (section && colorInput) {
//         const newColor = getRandomColor();
//         section.style.backgroundColor = newColor;
//         colorInput.value = newColor;
//         localStorage.setItem(sectionKey, newColor);
//     } else {
//         console.error("Section or color input not found.");
//     }
// }

// // Function to validate and update the background color based on input
// function handleColorInput(event) {
//     const section = event.target.closest("section.flex.justify-center");
//     const colorInput = section.querySelector("input[type='text']");
//     const sectionIndex = Array.from(document.querySelectorAll("section.flex.justify-center")).indexOf(section);
//     const sectionKey = `sectionColor${sectionIndex}`;

//     if (section && colorInput) {
//         const colorValue = colorInput.value.trim();
//         const hexRegex = /^#([0-9A-Fa-f]{6})$/;

//         if (hexRegex.test(colorValue)) {
//             section.style.backgroundColor = colorValue;
//             localStorage.setItem(sectionKey, colorValue);
//         } else if (colorValue === "") {
//             setRandomSectionColor();
//         }
//     }
// }

// // Initialize the functions
// window.onload = function () {
//     setRandomSectionColor();

//     // Event listener to the refresh button
//     const refreshButtons = document.querySelectorAll(".refresh");
//     refreshButtons.forEach(button => {
//         button.addEventListener("click", refreshSectionColor);
//     });

//     // Event listener to handle hex code input change
//     const colorInputs = document.querySelectorAll("input[type='text']");
//     colorInputs.forEach(input => {
//         input.addEventListener("input", handleColorInput);
//     });
// };
