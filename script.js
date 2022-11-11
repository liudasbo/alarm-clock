const currentTime = document.querySelector('.current__time'); 
const selectTime = document.querySelectorAll('select');
const setButton = document.querySelector('#setButton');
const optionMenus = document.querySelector('.card__select');
const statusMsg = document.querySelector('.card__status');

let alarmTime;
let alertStatus = false; // True if alert is on 
alarmSound = new Audio('resources/audio/Alarm sound effect.mp3')

// Updates current time display
updateCurrentTime();
setInterval(updateCurrentTime, 1000);
function updateCurrentTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    const time = h + ":" + m + ":" + s;
    currentTime.innerHTML = time;

    if (alarmTime == h + ":" + m && alertStatus == true) {
        setButton.innerHTML = 'STOP ALARM';
        alert();
    }
}

// Plays alarm sound
function alert () {
    if (alertStatus == true) {
        alarmSound.loop = true;
        alarmSound.play();
        statusMsg.style.color = '#A62639';
        statusMsg.firstElementChild.innerHTML = `ALARM! ${alarmTime}`
    } else if (alertStatus == false) {
        alarmSound.pause();
        statusMsg.style.color = '#6A6A6A';
    }
}

// Adds hours to the option list
for (let i = 23; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option value="${i}">${i}</option>`
    selectTime[0].firstElementChild.insertAdjacentHTML('afterend', options);
}
// Adds minutes to the option list
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option value="${i}">${i}</option>`
    selectTime[1].firstElementChild.insertAdjacentHTML('afterend', options);
}

// Sets alarm and shows alarm set time
setButton.addEventListener('click', setAlarm);
function setAlarm() {
    let timeSelected = `${selectTime[0].value}:${selectTime[1].value}`;
    if (timeSelected.includes('Please select hour') || timeSelected.includes('Please select minute')) {
        selectTime[0].style.color = '#A62639';
        selectTime[1].style.color = '#A62639';
        if (!selectTime[0].value.includes('Please select hour')) {
            selectTime[0].style.color = '#1F1F1F';
        } else if (!selectTime[1].value.includes('Please select minute')) {
            selectTime[1].style.color = '#1F1F1F';
        }
    } else {
        // Sets alarm
        if (setButton.innerHTML === 'SET ALARM') {
            optionMenus.style.display = 'none';
            statusMsg.style.display = 'block';
            setButton.innerHTML = 'CANCEL ALARM';
            setButton.classList.replace('buttons-active', 'buttons-active-cancel');

            let msg = `<p>Alarm set at ${timeSelected}</p>`;
            statusMsg.insertAdjacentHTML('afterbegin', msg);
            
            selectTime[0].style.color = '#1F1F1F';
            selectTime[1].style.color = '#1F1F1F';

            alarmTime = timeSelected;

            alertStatus = true;
        // Cancel or stop alarm
        } else { 
            setButton.innerHTML = 'SET ALARM';
            statusMsg.style.display = 'none';
            optionMenus.style.display = 'flex';
            setButton.classList.replace('buttons-active-cancel', 'buttons-active');

            statusMsg.firstElementChild.remove();

            alertStatus = false;
            alert();
        }
    }
}