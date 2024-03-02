
var projects = [
  {
      id: 1,
      title: "Gestionale",
      customer: "Azienda",
      description: "Creazione di un'applicazione web per la gestione dei progetti aziendali, inclusa la pianificazione delle attività, il monitoraggio del progresso e la collaborazione del team.",
      duration: "2021 - presente",
      work: ["UI","Web"]
  },
  {
      id: 2,
      title: " aziendale",
      customer: "Test SRL",
      description: "Ristrutturazione completa del sito web aziendale per migliorare l'esperienza dell'utente, l'ottimizzazione dei motori di ricerca e l'accessibilità.",
      duration: "2020 - 2021",
      work: ["UI","App","Web"]
      // Altri campi del progetto se necessario...
  },
  {
    id: 1,
    title: "Gestionale",
    customer: "Azienda",
    description: "Creazione di un'applicazione web per la gestione dei progetti aziendali, inclusa la pianificazione delle attività, il monitoraggio del progresso e la collaborazione del team.",
    duration: "2021 - presente",
    work: ["UI","Web"]
},
{
    id: 2,
    title: " aziendale",
    customer: "Test SRL",
    description: "Ristrutturazione completa del sito web aziendale per migliorare l'esperienza dell'utente, l'ottimizzazione dei motori di ricerca e l'accessibilità.",
    duration: "2020 - 2021",
    work: ["UI","App","Web"]
    // Altri campi del progetto se necessario...
},
{
  id: 1,
  title: "Gestionale",
  customer: "Azienda",
  description: "Creazione di un'applicazione web per la gestione dei progetti aziendali, inclusa la pianificazione delle attività, il monitoraggio del progresso e la collaborazione del team.",
  duration: "2021 - presente",
  work: ["UI","Web"]
},
{
  id: 2,
  title: " aziendale",
  customer: "Test SRL",
  description: "Ristrutturazione completa del sito web aziendale per migliorare l'esperienza dell'utente, l'ottimizzazione dei motori di ricerca e l'accessibilità.",
  duration: "2020 - 2021",
  work: ["UI","App","Web"]
  // Altri campi del progetto se necessario...
},
{
  id: 1,
  title: "Gestionale",
  customer: "Azienda",
  description: "Creazione di un'applicazione web per la gestione dei progetti aziendali, inclusa la pianificazione delle attività, il monitoraggio del progresso e la collaborazione del team.",
  duration: "2021 - presente",
  work: ["UI","Web"]
},
{
  id: 2,
  title: " aziendale",
  customer: "Test SRL",
  description: "Ristrutturazione completa del sito web aziendale per migliorare l'esperienza dell'utente, l'ottimizzazione dei motori di ricerca e l'accessibilità.",
  duration: "2020 - 2021",
  work: ["UI","App","Web"]
  // Altri campi del progetto se necessario...
},
{
  id: 1,
  title: "Gestionale",
  customer: "Azienda",
  description: "Creazione di un'applicazione web per la gestione dei progetti aziendali, inclusa la pianificazione delle attività, il monitoraggio del progresso e la collaborazione del team.",
  duration: "2021 - presente",
  work: ["UI","Web"]
},
{
  id: 2,
  title: " aziendale",
  customer: "Test SRL",
  description: "Ristrutturazione completa del sito web aziendale per migliorare l'esperienza dell'utente, l'ottimizzazione dei motori di ricerca e l'accessibilità.",
  duration: "2020 - 2021",
  work: ["UI","App","Web"]
  // Altri campi del progetto se necessario...
},
];





function generateProjectCard(project) {
  var card = document.createElement("div");
  card.classList.add("project-card", "col-8", "mb-3", "col-4", "col-sm-4", "col-lg-3");

  card.innerHTML = `
     <div class="project-header-row align-items-center">
      <div class="icon-container" style="width: 50px; height: 50px; background-color: #f0f0f0; text-align: center; line-height: 50px;">
      <span style="color: #555;">Logo</span>
      </div>
    
     <h5 class="text-left">${project.title}</h5>
    </div>
    <div class="project-description text-left">
       <p>${project.customer}</p>

   </div>
  `;


  // Aggiungi l'evento onclick per gestire il click sulla card
  card.onclick = function() {
      toggleProjectDetails(card);
  };
  return card;
}


function generateProjectCards() {
  var projectContainer = document.querySelector(".horizontal-scroll");

  // Itera attraverso l'array projects e crea una card HTML per ciascun progetto
  projects.forEach(function(project) {
      var card = generateProjectCard(project);
      projectContainer.appendChild(card);

      // Aggiungi l'evento onclick alla card appena creata
      card.addEventListener('click', function() {
          toggleProjectDetails(project,projectContainer, card);
      });
  });
}

generateProjectCards();



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
  threshold: 0.3 // Definisce quanto dell'elemento deve essere visibile prima che venga rilevato
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

projectCards.forEach(function(card) {
  card.addEventListener('click', function() {
      toggleProjectDetails(card); // Chiama la funzione toggleProjectDetails quando la card viene cliccata
  });
});

function toggleProjectDetails(project,projectContainer,card) {
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
  projectDetails.className = 'project-details row project-details-container'; // Aggiungo la classe 'row' per utilizzare il sistema di griglie di Bootstrap
  projectDetails.innerHTML = `
          <div class="col-md-6 ">
              <h3 class="mb-2">${project.title}</h3>
              <p class="project-detaill-info">Durata: ${project.duration}</p>
              <div class=" row project-description text-left">
              ${project.work.map(work => `<p class="col-md-2  mr-2 project-field">${work}</p>`).join('')}
              </div>
          </div>
          <div class="col-md-6">
              <p>${project.description}</p>

          </div>
  `;
  projectContainer.appendChild(projectDetails);

  // Aggiungi una classe per mostrare con animazione
  setTimeout(function() {
      projectDetails.classList.add('show-details');
  }, 50); // Ritarda l'aggiunta della classe per garantire che l'elemento sia stato inserito nel DOM
}