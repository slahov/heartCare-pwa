function scrollToForm() {
    var targetElement = document.getElementById('empty-div');
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


document.getElementById("hamburger-menu-button").addEventListener("click", function() {
    var overlayMenu = document.getElementById("overlay-menu");
    if (overlayMenu.style.display === "flex") {
        overlayMenu.style.display = "none";
    } else {
        overlayMenu.style.display = "flex";
    }
});

document.getElementById("close-overlay-menu").addEventListener("click", function() {
    var overlayMenu = document.getElementById("overlay-menu");
    overlayMenu.style.display = "none";
});
// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const navBar = document.querySelector('.nav');
// hamburgerMenu.addEventListener('click', () => {
//     navBar.classList.toggle('active');
// });
//
// if (window.innerWidth <= 600) {
//     hamburgerMenu.style.display = 'block';
//     navBar.style.display = 'none';
// }

// Zachytenie zmeny hodnoty slidera
document.getElementById('genHlthRange').addEventListener('input', function() {
    // Získanie aktuálnej hodnoty slidera
    var sliderValue = parseInt(this.value); // Prevod na číslo

    // Mapovanie medzi hodnotami slidera a vašimi vlastnými hodnotami
    var mappedValue = '';
    switch (sliderValue) {
        case 1:
            mappedValue = 'veľmi zlé';
            break;
        case 2:
            mappedValue = 'podpriemerné';
            break;
        case 3:
            mappedValue = 'priemerné';
            break;
        case 4:
            mappedValue = 'nadpriemerné';
            break;
        case 5:
            mappedValue = 'excelentné';
            break;
        default:
            mappedValue = 'Neznáma hodnota';
    }

    // Aktualizácia obsahu elementu pre zobrazenie hodnoty
    document.getElementById('sliderValue').textContent = mappedValue;
});

document.addEventListener('DOMContentLoaded', function() {
        var slider = document.getElementById('physHlthRange');
        var output = document.getElementById('sliderValuePhysHlth');

        // Zobrazuje aktuálnu hodnotu slidera počas posúvania
        slider.oninput = function() {
            output.textContent = this.value;
        };
    });

    // Form cannot be submitted if all text fields arent filled
    function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert("Prosím, vyplňte všechny údaje.");
        return false;
    }
    return true;
}