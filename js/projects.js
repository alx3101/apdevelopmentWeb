
var projects = [
  {
      id: 1,
      title: "ApDevelopment",
      icon: "icons/DARK WITH COLOR.png",
      customer: "",
      description: "This project involves the development of our website from scratch, aiming to enhance user experience and functionality.",
      duration: "February - March 2024",
      work: ["Web"]
  },
  {
      id: 2,
      title: "Beyes",
      customer: "Beyes SRL",
      icon: "",
      description: "Beyes is a real-time customer monitoring application <br> designed to provide users with insights into crowd levels within various venues. With Beyes, users can receive up-to-date information on crowd density in their desired area, enabling them to make informed decisions about their activities. The project encompasses the development of native apps to offer an optimized experience across different platforms, as well as the implementation of backend infrastructure to manage and analyze collected data. Additionally, Beyes also includes the production phase to ensure an effective market launch.",
      duration: "2020 - Now",
      work: ["UI","App","Web","Backend","MQTT"]
      // Altri campi del progetto se necessario...
  },
  {
    id: 3,
    title: "Trading signal App",
    icon: "",
    customer: "Private customer",
    description: "Trading Signal App is a project focused on creating an iOS application that provides trading signals. <br>The app was developed to allow users to receive real-time trading signals and make informed investment decisions. <br>The work involved developing an intuitive user interface (UI) to ensure an optimal user experience. <br>In addition to the front-end aspect, a robust backend was implemented to manage data and integrate an automated system for uploading trading signals. <br>The project was completed from June 2020 to December 2020, in collaboration with a private customer.",
    duration: "June 2020 - Dicember 2020",
    work: ["UI","App", "Backend"]
},
{
    id: 4,
    title: "More coming soon...",
    customer: "",
    description: "",
    duration: "",
    work: []
    // Altri campi del progetto se necessario...
}
];





function generateProjectCard(project) {
  var card = document.createElement("div");
  card.classList.add("project-card", "col-10", "mb-3", "col-4", "col-sm-4", "col-lg-3");

  card.innerHTML = `
  <div class="project-header-row align-items-center">
  ${project.icon ? `
    <div class="col-4" style="overflow: hidden;">
      <img src="${project.icon}" alt="Logo" style="max-width: 100%; max-height: 100%; float: left;">
    </div>
  ` : ''}
  <div class="col-8 align-items-center" style="align-items: center;">
    <h5 class="text-left" style="width: 100%;">${project.title}</h5>
    <div class="project-description text-left" style="width: 100%;">
      <p style="font-size: 20px; width: 100%;">${project.customer}</p>
    </div>
  </div>
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

function isMobile() {
  return window.matchMedia("only screen and (max-width: 768px)").matches;
}

const options = {
  threshold: isMobile() ? 0.00 : 0.3
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

  if (project.title == "More coming soon...") {
    return;
}
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
  projectDetails.className = 'project-details row project-details-container mt-5 mb-5'; // Aggiungo la classe 'row' per utilizzare il sistema di griglie di Bootstrap
  projectDetails.innerHTML = `
          <div class="col-md-6 mb-2">
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