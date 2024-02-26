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

function toggleProjectDetails(card) {
  // Seleziona il contenitore delle project card
  var projectContainer = card.parentElement;

  // Seleziona il contenitore dei dettagli del progetto
  var projectDetails = projectContainer.querySelector('.project-details');

  // Rimuovi la classe active dai dettagli del progetto attualmente visibili, se presenti
  var activeDetails = document.querySelector('.project-details.active');
  if (activeDetails) {
      activeDetails.classList.remove('active');
  }

  // Se i dettagli del progetto sono già visibili, nascondili
  if (projectDetails && projectDetails.classList.contains('active')) {
      projectDetails.classList.remove('active');
  } else {
      // Altrimenti, aggiungi la classe active per mostrare i dettagli del progetto con un effetto di dissolvenza
      projectDetails.classList.add('active');
  }
}


// Aggiungi l'evento onclick a ciascuna project-card
projectCards.forEach(function(card) {
    card.addEventListener('click', function() {
        toggleProjectDetails(card); // Chiama la funzione toggleProjectDetails quando la card viene cliccata
    });
});

function toggleProjectDetails(card) {
  // Seleziona il contenitore delle project card
  var projectContainer = card.parentElement;

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

  // Crea e aggiungi i dettagli del progetto sotto la card cliccata
  var projectDetails = document.createElement('div');
  projectDetails.className = 'project-details';
  projectDetails.innerHTML = `
      <h3>Descrizione dettagliata del progetto</h3>
      <p>Qui puoi inserire una descrizione più lunga del progetto, fornendo informazioni dettagliate su cosa sia il progetto, quali siano gli obiettivi e quali siano state le principali sfide.</p>
      <img src="path_to_image1.jpg" alt="Immagine 1">
      <img src="path_to_image2.jpg" alt="Immagine 2">
      <p>Per ulteriori informazioni, visita il <a href="link_to_project_website" target="_blank">sito web del progetto</a>.</p>
  `;
  projectContainer.appendChild(projectDetails);

  // Aggiungi una classe per mostrare con animazione
  setTimeout(function() {
      projectDetails.classList.add('show-details');
  }, 50); // Ritarda l'aggiunta della classe per garantire che l'elemento sia stato inserito nel DOM
}


