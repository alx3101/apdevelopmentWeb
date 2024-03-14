
const _supabase = supabase.createClient(
    'https://fpooonwgufamtjvmknzi.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwb29vbndndWZhbXRqdm1rbnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzcwMTcsImV4cCI6MjAyNTI1MzAxN30.miXFlm5zV60UXWAsKhARbEPPtTZnVMDxvmSYyRy6odo'
);


function toggleCheckbox(id, containerId) {
    var checkbox = document.getElementById(id);
    var container = document.getElementById(containerId);
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        console.log("selezionato");
        container.classList.add("selected");
        container.classList.remove("not-selected");
    } else {
        console.log("Non selezionato");
        container.classList.add("not-selected");
        container.classList.remove("selected");
    }
    
    // Aggiorna manualmente lo stato dell'input checkbox
    checkbox.dispatchEvent(new Event('change'));
}

var formInputs = document.querySelectorAll('#myForm input[type="checkbox"]');
formInputs.forEach(function(input) {
    input.addEventListener('change', updateSubmitButtonState);
});

document.getElementById('myForm').addEventListener('input', updateSubmitButtonState);

function updateSubmitButtonState() {
    var fullName = document.getElementById('fullNameInput').value;
    var email = document.getElementById('emailInput').value;
    var checkboxes = document.querySelectorAll('#myForm input[type="checkbox"]');
    
    var submitButton = document.getElementById('submitButton');
    var isCheckboxSelected = false;
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            isCheckboxSelected = true;
        }
    });

    if (fullName.trim() !== '' && email.trim() !== '' && isCheckboxSelected) {
        submitButton.disabled = false;
        console.log("enabled");
    } else {
        submitButton.disabled = true;
        console.log("disabled");
    }
}

document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita il comportamento di default del modulo

    // Ottieni i valori dai campi del modulo
    const fullName = document.getElementById('fullNameInput').value;
    const email = document.getElementById('emailInput').value;
    const details = document.getElementById('exampleFormControlTextarea1').value;

    // Ottieni i servizi selezionati
    const selectedServices = [];
    document.querySelectorAll('.form-check-input:checked').forEach(function(serviceCheckbox) {
        selectedServices.push(serviceCheckbox.parentElement.textContent.trim());
    });

    // Trasforma i servizi selezionati in una stringa separata da virgole
    const servicesString = selectedServices.join(', ');

    try {
        await invokeSupabaseFunction(fullName, email, 'Richiesta informazioni', details, servicesString);

    } catch (error) {
        console.error('Si è verificato un errore durante l\'invocazione della funzione Supabase:', error);
    }
});




 async function invokeSupabaseFunction(user, email, subject, details, requestedServices ) {
  try {
    const { data, error } = await _supabase.functions.invoke('contact-web', {
      body: { userInformations: user, senderEmail: email, requestedServices: requestedServices, subject: subject, body: details}
    });

    if (data) {
        console.log('data', data)
    }

    if (error) {
      console.error('Errore durante l\'invocazione della funzione Supabase:', error.message);
      // Gestione degli errori
    } else {
      console.log('Risposta dalla funzione Supabase:', data);
      // Logica per gestire la risposta
    }
  } catch (error) {
    console.error('Errore generale:', error);
    // Gestione degli errori
  }
}




