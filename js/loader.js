document.addEventListener('DOMContentLoaded', function() {
    // Show loader
    const loader = document.querySelector('.loader-container');
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500); // Half second delay to ensure smooth transition
    });
});
