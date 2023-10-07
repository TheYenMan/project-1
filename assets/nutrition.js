var roundedNutritionCalories;
// document.addEventListener('DOMContentLoaded', function() {
    var nutritionForm = document.querySelector('.food-content form');
    var nutritionTotalElement = document.getElementById('nutrition-total');
    var totalNutritionCalories = 0; // Initialize total calories


    nutritionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        var nutritionInput = document.getElementById('food-item');
        var food = nutritionInput.value;
        var nutritionList = document.getElementById("nutritionlist");
        var currentTime = dayjs().format('h:mm a');
       var url = 'https://api.api-ninjas.com/v1/nutrition?query=' + food;
       var apiKey = 's81C1AjLx2vPymF7Q7bkww==pdFq92tzvYPaBPr8';


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
            var listNutrition = document.createElement('li');
            // Concatenate activity name and total calories with a separator
            var nutritionCalories = result[i].calories;
            listNutrition.textContent = food + ' - ' + Math.floor(nutritionCalories) + ' cal' + " (" + currentTime + ")";
            nutritionList.appendChild(listNutrition);


            // Update total calories
            totalNutritionCalories += nutritionCalories;
            roundedNutritionCalories= Math.floor(totalNutritionCalories)
            nutritionTotalElement.textContent = 'Nutrition calories: ' + Math.floor(totalNutritionCalories);
            if(roundedActivityCalories && roundedNutritionCalories) {
                // console.log(roundedNutritionCalories-roundedActivityCalories)
                subtractCalories();
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
    // Clear the input field after adding the activity
    nutritionInput.value = '';
});
window.totalNutritionCalories = totalNutritionCalories;
// });
// if(roundedActivityCalories){
//     console.log(roundedNutritionCalories-roundedActivityCalories)
// }