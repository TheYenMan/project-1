// Initialize variables
var roundedActivityCalories = 0;
var activityArray = [];

// Function to render an activity item
function renderActivityItem(activity, calories, time) {
    var activityList = document.getElementById('activitylist');
    var listActivity = document.createElement('li');
    listActivity.textContent = activity + ' - ' + calories + ' cal' + ' (' + time + ')';
    activityList.appendChild(listActivity);
}

// Function to handle form submission
function handleFormSubmit(event) {
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
        var activityCalories = result[0].total_calories;

        // Create an object representing the activity item
        var activityItem = {
            name: activity,
            calories: activityCalories,
            time: currentTime
        };

        // Update total calories
        roundedActivityCalories += activityCalories;

        document.getElementById('activity-total').textContent = 'Activity calories: ' + Math.floor(roundedActivityCalories);

        // Render the activity item
        renderActivityItem(activity, activityCalories, currentTime);

        // Push the activity item to the activityArray
        activityArray.push(activityItem);

        // Save the updated activity list to local storage
        saveActivityListToLocalStorage(activityArray);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

    // Clear the input field after adding the activity
    activityInput.value = '';
}

// Function to save the activity list to local storage
function saveActivityListToLocalStorage(activityList) {
    // Save the entire activity list to local storage
    localStorage.setItem('activityHistory', JSON.stringify(activityList));
}

// Function to initialize the activity list
function initActivityList() {
    var storedActivity = localStorage.getItem('activityHistory');

    if (storedActivity) {
        activityArray = JSON.parse(storedActivity);
    }

    // Render the stored activity items
    activityArray.forEach((item) => {
        renderActivityItem(item.name, item.calories, item.time);
        roundedActivityCalories += item.calories;
    });

    // Update the total activity calories display
    document.getElementById('activity-total').textContent = 'Activity calories: ' + Math.floor(roundedActivityCalories);
}

// Add an event listener to wait for the page to fully load
window.onload = function() {
    var activityForm = document.querySelector('.activity-content form');
    activityForm.addEventListener('submit', handleFormSubmit);

    // Initialize the activity list
    initActivityList();
    
};
