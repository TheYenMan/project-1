document.addEventListener('DOMContentLoaded', function() {
    var nutritionForm = document.querySelector('.food-content form');
    nutritionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var nutritionInput = document.getElementById('food-item');
        var food = nutritionInput.value;

        
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/nutrition?query=' + food,
            headers: { 'X-Api-Key': 's81C1AjLx2vPymF7Q7bkww==pdFq92tzvYPaBPr8'},
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
       

        // Clear the input field after adding the activity
        nutritionInput.value = '';
    });
});