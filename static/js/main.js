function scrollToForm() {
    var targetElement = document.getElementById('row');
    var targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
    var initialOffset = window.pageYOffset;
    var distance = targetOffset - initialOffset;

    var startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;

        var scrollProgress = Math.min(timeElapsed / 1000, 1);

        var scrollPosition = initialOffset + distance * scrollProgress;

        window.scrollTo(0, scrollPosition);

        if (timeElapsed < 1000) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
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