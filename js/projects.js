// Seleziona tutti gli elementi .project-card
const projectCards = document.querySelectorAll('.project-card');

// Funzione per controllare se un elemento è visibile nel viewport
const isVisible = elem => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Aggiungi la classe 'visible' agli elementi già visibili
projectCards.forEach(card => {
  if (isVisible(card)) {
    card.classList.add('visible');
  }
});

// Opzioni per l'IntersectionObserver
const options = {
  threshold: 0.2 // Definisce quanto dell'elemento deve essere visibile prima che venga rilevato
};

// Funzione di callback per l'IntersectionObserver
const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Aggiunge la classe 'visible' quando l'elemento è visibile
    } else {
      // Rimuovi la classe 'visible' solo se l'elemento è completamente fuori dalla viewport a sinistra
      if (entry.boundingClientRect.x > 0) {
        entry.target.classList.remove('visible');
      }
    }
  });
};

// Crea una nuova istanza dell'IntersectionObserver con la funzione di callback e le opzioni
const observer = new IntersectionObserver(callback, options);

// Registra ogni elemento .project-card nell'IntersectionObserver
projectCards.forEach(card => {
  observer.observe(card);
});

// Aggiungi l'evento onclick a ciascuna project-card
projectCards.forEach(function(card) {
    card.addEventListener('click', function() {
        toggleProjectDetails(card); // Chiama la funzione toggleProjectDetails quando la card viene cliccata
    });
});

function toggleProjectDetails(card) {
  // Seleziona il contenitore delle project card
  var projectContainer = card.closest('.horizontal-scroll').parentElement;

  // Rimuovi eventuali dettagli del progetto esistenti
  var existingProjectDetails = projectContainer.querySelector('.project-details');
  if (existingProjectDetails) {
      existingProjectDetails.remove();
  }

  // Seleziona il contenitore dei dettagli del progetto attualmente visualizzato
  var currentProjectDetails = projectContainer.querySelector('.project-details');

  // Controlla se la card cliccata è già selezionata
  var isSelected = card.classList.contains('selected');

  // Rimuovi la classe 'selected' da tutte le altre card
  var allCards = projectContainer.querySelectorAll('.project-card');
  allCards.forEach(function(item) {
      item.classList.remove('selected');
  });

  // Se i dettagli del progetto attualmente visualizzati esistono, rimuovili con dissolvenza
  if (currentProjectDetails) {
      currentProjectDetails.classList.remove('show-details');
      setTimeout(function() {
          currentProjectDetails.remove();
      }, 300); // Ritardo per consentire l'animazione prima della rimozione effettiva
  }

  // Se la card cliccata è già selezionata, non fare nient'altro
  if (isSelected) {
      return;
  }

  // Aggiungi la classe 'selected' alla card cliccata
  card.classList.add('selected');

  // Crea e aggiungi i dettagli del progetto sotto il contenitore principale
  var projectDetails = document.createElement('div');
  projectDetails.className = 'project-details row'; // Aggiungo la classe 'row' per utilizzare il sistema di griglie di Bootstrap
  projectDetails.innerHTML = `
      <div class="project-details row show-details project-details-container">
          <div class="col-md-6 ">
              <h3 class="mb-2">Titolo progetto</h3>
              <p class="project-detaill-info">Durata: 2021 - presente</p>
              <div class=" row project-description text-left">
                  <p class="col-md-2 mr-lg-2 project-field">UI</p>
                  <p class="col-md-2 mr-lg-2 project-field">App</p>
                  <p class="col-md-2 mr-lg-2 project-field">Web</p>
              </div>
          </div>
          <div class="col-md-6">
              <p class="mb-3">L'implementazione di questo sistema consentirà alle aziende di ottimizzare le proprie operazioni di gestione del personale, migliorare l'efficienza dei processi e prendere decisioni strategiche informate sulla base dei dati raccolti. La piattaforma sarà progettata per adattarsi alle esigenze specifiche di ciascun cliente, consentendo una personalizzazione completa e flessibile dei flussi di lavoro e delle funzionalità.</p>
              <p class="mb-3">Il team di sviluppo sarà composto da esperti nel campo dello sviluppo software, dell'ingegneria dei dati, della user experience e della gestione delle risorse umane. Sarà adottato un approccio agile allo sviluppo del software, con rilasci incrementali e feedback continui da parte degli utenti finali per garantire la massima soddisfazione e adattabilità del prodotto.</p>
              <p class="mb-3">Per ulteriori informazioni, visita il <a href="link_to_project_website" target="_blank">sito web del progetto</a>.</p>
          </div>
      </div>
  `;
  projectContainer.appendChild(projectDetails);

  // Aggiungi una classe per mostrare con animazione
  setTimeout(function() {
      projectDetails.classList.add('show-details');
  }, 50); // Ritarda l'aggiunta della classe per garantire che l'elemento sia stato inserito nel DOM
}
