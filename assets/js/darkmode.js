
// logic to switch light/dark mode on generator page

    // Select the button and the root element (HTML tag)
    const toggleButton = document.getElementById('darkModeToggle');
    const rootElement = document.documentElement;

    console.log('Dark Mode Toggle Button:', toggleButton);

// Check localStorage for theme preference on load
    const savedTheme = localStorage.getItem('theme');
    console.log('Theme on load:', savedTheme);

        if (savedTheme === 'dark') {
        rootElement.classList.add('dark');
        console.log('Switching to light mode');
        } else {
        rootElement.classList.remove('dark');
        console.log('Switching to dark mode');
        }


    // Add event listener to toggle button
    toggleButton.addEventListener('click', () => {
      if (rootElement.classList.contains('dark')) {
        rootElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        rootElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
    console.log(toggleButton)
