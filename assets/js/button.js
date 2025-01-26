document.addEventListener("DOMContentLoaded", function() {
    attachEventListeners();

    //Event Listener to the back button
    const redirectButton = document.getElementById("redirectButton");
    redirectButton.addEventListener("click", function () {
        window.location.href = "index.html"; 
    });

    // Function to attach event listeners to buttons
    function attachEventListeners() {
        console.log("Event listeners attached!");

        // Event listener to the refresh button
        const refreshButtons = document.querySelectorAll(".refresh");
        refreshButtons.forEach(button => {
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function(event) {
                    const section = this.closest("section");
                    refreshSectionColor(section); // Make sure to call refresh with the section
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

        // Event Listener to copy button
        const copyButtons = document.querySelectorAll(".copybtn");
        copyButtons.forEach(button => {
            // Prevent multiple listeners from being added
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

        // Event listener to handle hex code input change
        const colorInputs = document.querySelectorAll("input[type='text']");
        colorInputs.forEach(input => {
            // Prevent multiple listeners from being added
            if (!input.hasAttribute("data-listener-attached")) {
                input.addEventListener("input", handleColorInput);
                input.setAttribute("data-listener-attached", "true");
            }
        });

        // Event Listener to close button
        const closeButtons = document.querySelectorAll(".closebtn");
        closeButtons.forEach(button => {
            // Prevent multiple listeners from being added
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function() {
                    const sections = document.querySelectorAll("section.flex.justify-center");

                    // Allow deletion if there are more than 3 sections
                    if (sections.length > 3) {
                        const section = this.closest("section");
                        const sectionIndex = Array.from(sections).indexOf(section);
                        const sectionKey = `sectionColor${sectionIndex}`;
                        localStorage.removeItem(sectionKey);
                        section.remove();

                        // Update the sections count in localStorage
                        const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
                        localStorage.setItem("sectionsCount", sectionsCount);
                    }
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

        // Event Listener to add color button
        const addColorButton = document.querySelector(".btndark");
        addColorButton.addEventListener("click", function(event) {
            event.preventDefault();
            const sections = document.querySelectorAll("section.flex.justify-center");

            // Ensure that you only add one section at a time and don't exceed seven
            if (sections.length < 7) {
                addNewSection();
                attachNewSectionEventListeners();

                // Update the sections count in localStorage
                const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
                localStorage.setItem("sectionsCount", sectionsCount);
            } else {
                alert("You cannot add more than seven sections.");
            }
        });

        // Event Listener to lock button
        const lockButtons = document.querySelectorAll(".lockicon");
        lockButtons.forEach(button => {
            // Prevent multiple listeners from being added
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function(event) {
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
                button.setAttribute("data-listener-attached", "true");
            }
        });
    }

    // Function to attach event listeners to the new elements after adding a section
    function attachNewSectionEventListeners() {
        const refreshButtons = document.querySelectorAll(".refresh");
        refreshButtons.forEach(button => {
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function(event) {
                    const section = this.closest("section");
                    refreshSectionColor(section); // Make sure to call refresh with the section
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

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

        // Event listener to handle hex code input change
        const colorInputs = document.querySelectorAll("input[type='text']");
        colorInputs.forEach(input => {
            // Prevent multiple listeners from being added
            if (!input.hasAttribute("data-listener-attached")) {
                input.addEventListener("input", handleColorInput);
                input.setAttribute("data-listener-attached", "true");
            }
        });

        const closeButtons = document.querySelectorAll(".closebtn");
        closeButtons.forEach(button => {
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function() {
                    const sections = document.querySelectorAll("section.flex.justify-center");
                    // Allow deletion if there are more than 3 sections
                    if (sections.length > 3) {
                        const section = this.closest("section");
                        const sectionIndex = Array.from(sections).indexOf(section);
                        const sectionKey = `sectionColor${sectionIndex}`;
                        localStorage.removeItem(sectionKey);
                        section.remove();

                        // Update the sections count in localStorage
                        const sectionsCount = document.querySelectorAll("section.flex.justify-center").length;
                        localStorage.setItem("sectionsCount", sectionsCount);
                    }
                });
                button.setAttribute("data-listener-attached", "true");
            }
        });

        const lockButtons = document.querySelectorAll(".lockicon");
        lockButtons.forEach(button => {
            if (!button.hasAttribute("data-listener-attached")) {
                button.addEventListener("click", function(event) {
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
                button.setAttribute("data-listener-attached", "true");
            }
        });
    }
});
