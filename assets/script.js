var timeDisplayEl = $('#time-display');


function displayTime() {
    var rightNow = dayjs().format('dddd - MMM D, YYYY [at] h:mm:ss a');
    timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);

