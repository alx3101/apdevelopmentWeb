window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        var scrollPercentage = window.scrollY / (document.body.clientHeight - window.innerHeight);
        if (window.scrollY > 0) {
            var shadowColor = interpolateColor([255, 255, 255], [138, 43, 226], scrollPercentage * 2); // Aumento del fattore per un cambiamento più rapido
            var shadowOpacity = 0.7 - (scrollPercentage * 0.7); // Calcolo dell'opacità dell'ombra
            navbar.style.boxShadow = '0px 15px 150px rgba(' + shadowColor.join(',') + ', ' + shadowOpacity + ')'; // Imposta l'ombra con colore e opacità calcolati
        } else {
            navbar.style.boxShadow = 'none'; // Rimuovi l'ombra quando si è in cima alla pagina
        }
    }
});

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}


  