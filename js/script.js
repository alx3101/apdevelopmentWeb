function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Controlla se la parte superiore e inferiore della sezione è visibile
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

// Aggiorna l'opacità del div head-content quando la sezione About Us è completamente visibile
function updateOpacity() {
    var aboutSection = document.querySelector('#about');
    var headContent = document.querySelector('.head-content');

    if (isScrolledIntoView(aboutSection)) {
        aboutSection.classList.add('is-visible');
    } else {
        aboutSection.classList.remove('is-visible');
    }
}

// Aggiorna l'opacità quando la finestra viene scollegata o scorrevole
window.addEventListener('scroll', updateOpacity);
window.addEventListener('resize', updateOpacity);
updateOpacity(); // Chiama la funzione 