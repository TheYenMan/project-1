var timeDisplayEl = $('#time-display');


function displayTime() {
    var rightNow = dayjs().format('dddd, MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);
