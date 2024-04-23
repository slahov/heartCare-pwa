function scrollToForm()
{
    var targetElement = document.getElementById('row');
    targetElement.scrollIntoView({ behaviour: 'smooth', block: 'start' });
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navBar = document.querySelector('.nav');
hamburgerMenu.addEventListener('click', () => {
    navBar.classList.toggle('active');
});

if (window.innerWidth <= 600) {
    hamburgerMenu.style.display = 'block';
    navBar.style.display = 'none';
}