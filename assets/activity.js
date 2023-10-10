var roundedActivityCalories;

// Add an event listener to wait for the page to fully load
window.onload = function() {


    var activityForm = document.querySelector('.activity-content form');
    var activityTotalElement = document.getElementById('activity-total');
    var totalActivityCalories = 0; // Initialize total calories
    var activityList = document.getElementById('activitylist'); 
    var activityArray = [];// Initialize an array to store activity items
    var activity;
    var currentTime = dayjs().format('h:mm a');

    activityForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var activityInput = document.getElementById('activity-item');
        activity = activityInput.value;
       
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
           // for (var i = 0; i < 1; i++) {
            //     var listActivity = document.createElement('li');
            //     var activityCalories = result[i].total_calories;
            //     // Create an object representing the activity item
            //     var activityItem = {
            //         name: activity,
            //         calories: result[i].total_calories,
            //         time: currentTime
            //     };
            //     listActivity.textContent = activity + ' - ' + activityCalories + ' cal' + " (" + currentTime + ")";
            // activityList.appendChild(listActivity);


            //     // Push the activity item to the activityList array
            //     activityArray.push(activityItem);

            //     // Update total calories
            //     totalActivityCalories += activityItem.calories;
            //     roundedActivityCalories = Math.floor(totalActivityCalories);
            //     activityTotalElement.textContent = 'Activity calories: ' + Math.floor(totalActivityCalories);
                // renderActivityList(result, i);
                // Save the updated activity list to local storage
                 saveActivityListToLocalStorage(activityArray, result);
            //}
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });

        // Clear the input field after adding the activity
        activityInput.value = '';
    });
    console.log(activityArray);
    // Function to save the activity list to local storage
    function saveActivityListToLocalStorage(activityList, result) {
        // Save the entire activity list to local storage
        localStorage.setItem('activityHistory', JSON.stringify(activityList));

        console.log(result);

        renderActivityList(result);
    }

    function innitActivityList() {
        var storedActivity = localStorage.getItem("activityHistory");

        console.log(storedActivity);

        if (storedActivity) {
            activityArray = JSON.parse(storedActivity)

            console.log(activityArray)
        }

        renderActivityList(activityArray);

    }

    function renderActivityList(result) {
        console.log(result);
         for (var i = 0; i < 1; i++) {
            console.log(result)
            var listActivity = document.createElement('li');
            var activityCalories = result[i].calories;
            // Create an object representing the activity item
            var activityItem = {
                name: activity,
                calories: result[i].total_calories,
                time: currentTime
            };
            listActivity.textContent = activity + ' - ' + activityCalories + ' cal' + " (" + currentTime + ")";
        activityList.appendChild(listActivity);


            // Push the activity item to the activityList array
            activityArray.push(activityItem);

            console.log()

            // Update total calories
            totalActivityCalories += activityItem.calories;
            roundedActivityCalories = Math.floor(totalActivityCalories);
            activityTotalElement.textContent = 'Activity calories: ' + Math.floor(totalActivityCalories);

            //saveActivityListToLocalStorage(activityArray);
        }
    }
    
    
    innitActivityList(activityArray);

    // Assign the totalActivityCalories to the global window object
    window.totalActivityCalories = totalActivityCalories;
};
