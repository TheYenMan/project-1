myPromise.then(function(totalNutritionCalories){
    
    totalActivity = 300;
    totalNutritionCalories = totalNutritionCalories - totalActivity;

    console.log(totalNutritionCalories)
})

document.addEventListener('DOMContentLoaded', function() {
    var activityForm = document.querySelector('.activity-content form');
    var activityTotalElement = document.getElementById('activity-total');
    var totalActivityCalories = 0; // Initialize total calories

    activityForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var activityInput = document.getElementById('activity-item');
        var activity = activityInput.value;
        var activityList = document.getElementById('activitylist');

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
                // Concatenate activity name and total calories with a separator
                var activityCalories = result[i].total_calories;
                listActivity.textContent = activity + ' : ' + activityCalories + ' cal' + " (" + currentTime + ")";
                activityList.appendChild(listActivity);

                // Update total calories
                totalActivityCalories += activityCalories;
                activityTotalElement.textContent = 'Activity calories: ' + Math.floor(totalActivityCalories);

            }
            
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });



        // Clear the input field after adding the activity
        activityInput.value = '';
    });


    window.totalActivityCalories = totalActivityCalories;
});

