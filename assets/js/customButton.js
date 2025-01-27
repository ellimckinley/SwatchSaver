document.addEventListener("DOMContentLoaded", function() {
    attachEventListeners();

// Attach Event Listeners to buttons
function attachEventListeners() {
    console.log("Event listeners attached!");
    
    // Event Listener - Generate button
    const generateButton = document.querySelector(".btngen");
    if (generateButton) {
        generateButton.addEventListener("click", function() {
            const sections = document.querySelectorAll("section.flex.justify-center");

            //Check if the section is locked
            sections.forEach((section, index) => {
                const lockButton = section.querySelector(".lockicon");
                const isLocked = lockButton && lockButton.classList.contains("locked");

                // Not Locked = Generate New Color
                if (!isLocked) {
                    const newColor = getRandomColor();
                    section.style.backgroundColor = newColor;

                    // Update the color in the input field
                    const colorInput = section.querySelector("input[type='text']");
                    colorInput.value = newColor;

                    // Update localStorage
                    localStorage.setItem(`sectionColor${index}`, newColor);
                }
            });
        });
    }

    // Event Listener - Back Button
    const redirectButton = document.getElementById("redirectButton");
    if (redirectButton) {
        redirectButton.addEventListener("click", function () {
            window.location.href = "index.html"; 
        });
    }

    // Event Listener - Add Color Button
    const addColorButton = document.querySelector(".btnadd");
    addColorButton.addEventListener("click", function(event) {
        event.preventDefault();
        const sections = document.querySelectorAll("section.flex.justify-center");

        // Adding a Section
        if (sections.length < 7) {
            addNewSection();
            attachNewSectionEventListeners();

            // Update localStorage
            const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
            localStorage.setItem("sectionsCount", sectionsCount);
        } else {
            alert("You cannot add more than seven sections.");
        }

        // // Refresh Page - Temp Bug Fix
        window.location.reload();
    });

    // Event Listener - Refresh Button
    const refreshButtons = document.querySelectorAll(".refresh");
    refreshButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
                const section = this.closest("section");
                refreshSectionColor(section);
            });
            button.setAttribute("data-listener-attached", "true");
        }
    });

    // Event Listener - Copy Button
    const copyButtons = document.querySelectorAll(".copybtn");
    copyButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
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
            button.setAttribute("data-listener-attached", "true");
        }
    });
    
    // Event Listener - Close Button
    const closeButtons = document.querySelectorAll(".closebtn");
    closeButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function() {
                const sections = document.querySelectorAll("section.flex.justify-center");

                    // Deleting a Section
                    if (sections.length > 3) {
                        const section = this.closest("section");
                        const sectionIndex = Array.from(sections).indexOf(section);
                        const sectionKey = `sectionColor${sectionIndex}`;
                        localStorage.removeItem(sectionKey);
                        section.remove();

                        // Update localStorage
                        const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
                        localStorage.setItem("sectionsCount", sectionsCount);
                    }
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

    // Event Listener - Lock Button
    const lockButtons = document.querySelectorAll(".lockicon");
    lockButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                const inputField = this.closest("form").querySelector("input[type='text']");
                const refreshButton = this.closest("form").querySelector(".refresh");
                    
                // Locking/Unlocking a Section
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
                        this.querySelector("span").innerHTML = "&#xe898;";
                    }
                }
            });
            button.setAttribute("data-listener-attached", "true");
        }
    });
}

//Dev Note: This function is all event listeners running again. This is because when users add a new section, the event listeners are not attached to the new elements. This function is called to attach the event listeners to the new elements.
function attachNewSectionEventListeners() {
    
    // Event Listener - Refresh Button
    const refreshButtons = document.querySelectorAll(".refresh");
    refreshButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
                const section = this.closest("section");
                refreshSectionColor(section);
            });
            button.setAttribute("data-listener-attached", "true");
        }
    });

    // Event Listener - Copy Button
    const copyButtons = document.querySelectorAll(".copybtn");
    copyButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
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
            button.setAttribute("data-listener-attached", "true");
        }
    });

    // Event Listener - Close Button
    const closeButtons = document.querySelectorAll(".closebtn");
    closeButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function() {
                const sections = document.querySelectorAll("section.flex.justify-center");

                    // Deleting a Section
                    if (sections.length > 3) {
                        const section = this.closest("section");
                        const sectionIndex = Array.from(sections).indexOf(section);
                        const sectionKey = `sectionColor${sectionIndex}`;
                        localStorage.removeItem(sectionKey);
                        section.remove();

                        // Update localStorage
                        const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
                        localStorage.setItem("sectionsCount", sectionsCount);
                    }
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

    // Event Listener - Lock Button
    const lockButtons = document.querySelectorAll(".lockicon");
    lockButtons.forEach(button => {
        if (!button.hasAttribute("data-listener-attached")) {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                const inputField = this.closest("form").querySelector("input[type='text']");
                const refreshButton = this.closest("form").querySelector(".refresh");
                    
                // Locking/Unlocking a Section
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
                        this.querySelector("span").innerHTML = "&#xe898;";
                    }
                }
            });
            button.setAttribute("data-listener-attached", "true");
        }
    });
}
});