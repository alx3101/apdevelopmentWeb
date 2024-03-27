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

function toggleNavbar() {
    var navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse.classList.contains("show")) {
      // Se la navbar è già aperta, chiudila
      navbarCollapse.classList.remove("show");
      navbarCollapse.classList.add("collapsing");
      setTimeout(function() {
        navbarCollapse.classList.remove("collapsing");
      }, 300); // Tempo dell'animazione in millisecondi
    } else {
      // Se la navbar è chiusa, aprila
      navbarCollapse.classList.add("show");
    }
  }
  
  

function selectNavItem(element, sectionId) {
    // Rimuove la classe 'selected' da tutti i link di navigazione
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('selected');
    });
    
    // Aggiunge la classe 'selected' al link cliccato
    element.classList.add('selected');
   
    // Effettua lo scroll fino alla sezione appropriata
    if (sectionId === 'home') {
        scrollToTop();
    } else {
        var section = document.getElementById(sectionId);
        if (section) {
            if (isMobile()) {
                scrollToSection(section, true); // Con offset per dispositivi mobili
            } else {
                scrollToSectionCentered(section);
            }
        } else {
            console.log("Sezione non trovata:", sectionId);
        }
    }
}

// Effettua lo scroll fino all'inizio del viewport
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Effettua lo scroll fino alla parte superiore della sezione
function scrollToSection(section, mobileOffset) {
    var offset = mobileOffset ? 100 : 0; // Offset di 50px per dispositivi mobili
    window.scrollTo({
        top: section.offsetTop - offset,
        behavior: 'smooth'
    });
}

// Effettua lo scroll fino alla sezione centrata verticalmente
function scrollToSectionCentered(section) {
    var windowHeight = window.innerHeight;
    var sectionHeight = section.offsetHeight;
    var offset = (windowHeight - sectionHeight) / 2;
    window.scrollTo({
        top: section.offsetTop - offset,
        behavior: 'smooth'
    });
}

// Verifica se il dispositivo è mobile
function isMobile() {
    return window.matchMedia("only screen and (max-width: 768px)").matches;
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
        let sectionCenter = rect.top + rect.height / 2; // Calcoliamo il centro verticale della sezione
        if (isMobile()) {
            const offset = window.innerHeight * 0.1; // Definiamo un offset del 10% dell'altezza della finestra di visualizzazione solo su dispositivi mobili
            sectionCenter += offset; // Aggiungiamo l'offset al centro verticale della sezione solo su dispositivi mobili
        }
        if (sectionCenter >= 0 && sectionCenter <= window.innerHeight) {
            highlightNavItem(section.id);
        }
    });
}




  // Gestione dello scrolling e dell'evidenziazione iniziale
  document.addEventListener('scroll', handleScroll);
  window.addEventListener('DOMContentLoaded', handleScroll);



  