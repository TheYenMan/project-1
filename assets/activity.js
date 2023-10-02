// Function to handle adding activities
document.addEventListener('DOMContentLoaded', function() {
    var activityForm = document.querySelector('.activity-content form');
    activityForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var activityInput = document.getElementById('activity-item');
        var activity = activityInput.value;

    
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity,
            headers: { 'X-Api-Key': 'tVmjVkv8ropSYzdiyJMI8A==4xxqPwtUpB4dDOmg'},
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });

        // Clear the input field after adding the activity
        activityInput.value = '';
    });
});