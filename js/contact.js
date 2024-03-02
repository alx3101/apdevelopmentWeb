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





