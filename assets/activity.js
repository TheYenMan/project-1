var roundedActivityCalories;

// Add an event listener to wait for the page to fully load
window.onload = function() {
    var activityForm = document.querySelector('.activity-content form');
    var activityTotalElement = document.getElementById('activity-total');
    var totalActivityCalories = 0; // Initialize total calories
    var activityList = document.getElementById('activitylist'); 
    var activityArray = [];// Initialize an array to store activity items

    activityForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var activityInput = document.getElementById('activity-item');
        var activity = activityInput.value;
        var currentTime = dayjs().format('h:mm a');
        // Display the current time next to the activity input
        var url = 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity;
        var apiKey = 'tVmjVkv8ropSYzdiyJMI8A==4xxqPwtUpB4dDOmg';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error response');
            }
            return response.json();
        })
        .then((result) => {
            console.log(result);
            for (var i = 0; i < 1; i++) {
                var listActivity = document.createElement('li');
                var activityCalories = result[i].total_calories;
                // Create an object representing the activity item
                
                listActivity.textContent = activity + ' - ' + activityCalories + ' cal' + " (" + currentTime + ")";
            activityList.appendChild(listActivity);


                // Push the activity item to the activityList array
                activityArray.push(activityItem);

                // Update total calories
                totalActivityCalories += activityItem.calories;
                roundedActivityCalories = Math.floor(totalActivityCalories);
                activityTotalElement.textContent = 'Activity calories: ' + Math.floor(totalActivityCalories);

                // Save the updated activity list to local storage
                saveActivityListToLocalStorage(activityArray);
            }
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });

        // Clear the input field after adding the activity
        activityInput.value = '';
    });

    // Function to save the activity list to local storage
    function saveActivityListToLocalStorage(activityList) {

        var activityItem = {
            name: activity,
            calories: result[i].total_calories,
            time: currentTime
        };
        // Save the entire activity list to local storage
        localStorage.setItem('activityHistory', JSON.stringify(activityList));


    }
    
    // Assign the totalActivityCalories to the global window object
    window.totalActivityCalories = totalActivityCalories;
};
