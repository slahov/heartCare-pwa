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

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.dropdown-content a');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Zabraňuje predvolenému správaniu kliknutia na odkaz
            var selectedOption = this.textContent.trim(); // Získava text kliknutej možnosti
            var buttonElement = this.closest('.paste-button').querySelector('.button'); // Nájde tlačidlo v rodičovi
            var limitedText = selectedOption.substring(0, 20); // Obmedzí text na prvých 10 znakov
            var displayText = limitedText + '...'; // Pridáme tri bodky za skrátený text
            buttonElement.querySelector('span').textContent = displayText; // Aktualizuje text tlačidla
            buttonElement.style.color = 'black'; // Zmení farbu textu tlačidla na čiernu

            var dropdownContent = this.closest('.dropdown-content');
            dropdownContent.style.opacity = '0'; // Nastaví opacity na 0, aby sa skrylo dropdown menu

            // Znova otvorí dropdown menu po jednej sekunde
            setTimeout(function() {
                dropdownContent.style.opacity = ''; // Zruší nastavenú hodnotu opacity, aby sa dropdown menu zobrazilo
            }, 1000);
        });
    });
});


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

    document.getElementById('Income').addEventListener('input', function() {
        // Získanie aktuálnej hodnoty slidera
        var sliderValue = parseInt(this.value); // Prevod na číslo

        // Mapovanie medzi hodnotami slidera a vašimi vlastnými hodnotami
        var mappedValue = '';
        switch (sliderValue) {
            case 1:
                mappedValue = '< 10-tisíc eur';
                break;
            case 2:
                mappedValue = '10 - 15-tisíc eur';
                break;
            case 3:
                mappedValue = '15 - 20-tisíc eur';
                break;
            case 4:
                mappedValue = '20 - 25-tisíc eur';
                break;
            case 5:
                mappedValue = '25 - 35-tisíc eur';
                break;
            case 6:
                mappedValue = '35 - 50-tisíc eur'
                break;
            case 7:
                mappedValue = '50 - 75-tisíc eur'
                break;
            case 8:
                mappedValue = '75-tisíc eur a viac'
                break;
            default:
                mappedValue = 'Neznáma hodnota';
        }

        // Aktualizácia obsahu elementu pre zobrazenie hodnoty
        document.getElementById('sliderValueIncome').textContent = mappedValue;
    });