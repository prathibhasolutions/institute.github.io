// Function to show the search menu
function showSearchMenu() {
    const searchMenu = document.getElementById("myMenu");
    searchMenu.style.display = "block";

    // Add an event listener to detect clicks outside the search box and menu
    document.addEventListener('click', closeSearchMenuOnClickOutside);
}

// Function to close the search menu if clicked outside
function closeSearchMenuOnClickOutside(event) {
    const searchBox = document.getElementById("mySearch");
    const searchMenu = document.getElementById("myMenu");

    // Check if the clicked target is outside the search box and search menu
    if (!searchBox.contains(event.target) && !searchMenu.contains(event.target)) {
        searchMenu.style.display = "none";

        // Remove the event listener after closing the menu
        document.removeEventListener('click', closeSearchMenuOnClickOutside);
    }
}

// Function to filter the search menu items
function filterMenu() {
    const input = document.getElementById('mySearch');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('myMenu');
    const li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName("a")[0];
        const txtValue = a.textContent || a.innerText;

        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Attach the filterMenu function to the keyup event on the search input
document.getElementById('mySearch').addEventListener('keyup', filterMenu);


// Show/hide navigation menu
function showNavMenu() {
    document.getElementById('navLinks').classList.add('active');
}

function hideNavMenu() {
    document.getElementById('navLinks').classList.remove('active');
}

// Enable dropdown functionality for small screens
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });
});


/*sliding images  */
const swiper = new Swiper('.portfolio-details-slider', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
  