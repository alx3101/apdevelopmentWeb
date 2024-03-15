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

function selectNavItem(element, sectionId) {
    // Rimuovi la classe 'selected' da tutti i link di navigazione
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('selected');
    });
    
    // Aggiungi la classe 'selected' al link cliccato
    element.classList.add('selected');
   
    // Controllo sezione "home"
    if (sectionId === 'home') {
        // Effettua lo scroll fino all'inizio del viewport
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Controllo sezione valida
        var section = document.getElementById(sectionId);
        if (section) {
            // Effettua lo scroll fino alla sezione desiderata
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Sezione non trovata
            console.log("Sezione non trovata:", sectionId);
        }
    }
}



  
  // Funzione per evidenziare l'elemento della barra di navigazione corrispondente alla sezione attiva
  function highlightNavItem(sectionId) {
    const navItems = document.querySelectorAll('[data-section]');
    navItems.forEach(item => {
      if (item.getAttribute('data-section') === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function handleScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        console.log(section.id, rect.top, rect.bottom, window.innerHeight);
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            highlightNavItem(section.id);
        }
    });
}



  // Gestione dello scrolling e dell'evidenziazione iniziale
  document.addEventListener('scroll', handleScroll);
  window.addEventListener('DOMContentLoaded', handleScroll);



  