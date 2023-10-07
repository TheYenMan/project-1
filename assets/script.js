var timeDisplayEl = $('#time-display');
var calTotal = document.getElementById('calorie-total')

function displayTime() {
    var rightNow = dayjs().format('dddd - MMM D, YYYY [at] h:mm:ss a');
    timeDisplayEl.text(rightNow);
}


displayTime();
setInterval(displayTime, 1000);


function subtractCalories(){
        calTotal.innerHTML = (roundedNutritionCalories-roundedActivityCalories);
}