"use strict"; //help browser to run in struct to eliminate some js silent errors by changing them to throw errors

// function to toggle with the hamburger menu
function toggleMobileMenu(hamburgerMenu) {
    hamburgerMenu.classList.toggle('open');
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const searchForm = document.getElementById('search-form');

hamburgerMenu.addEventListener('click', () => {
    toggleMobileMenu(hamburgerMenu);
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form submission from reloading the page
  // Perform search logic here
});



document.addEventListener('click', (event) => {
    const isClickInside = hamburgerMenu.contains(event.target) || searchInput.contains(event.target);
    
    if (!isClickInside) {
        toggleMobileMenu(hamburgerMenu);
    }
});

// search not working
document.querySelector(".search-input").addEventListener("keyup", function () {
  console.log(document.querySelector(".search-input").value);
  displayProduct(getProductList, document.querySelector('.filter-button-group button.active').value, this.value);
});
