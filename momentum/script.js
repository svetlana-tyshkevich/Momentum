// DOM elements
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
let prevName = '[Enter name]';
let prevFocus = '[Enter focus]';

// Show time
function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    // если минут 00 и секунд 00 -поменяй фон

    // Output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

//Show date
function showDate() {
    let today = new Date();
    const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dayOfWeek = today.getDay();
    let dateNumber = today.getDate();
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = today.getMonth();

    // Output date
    date.innerHTML = `${weekArr[dayOfWeek]}<span>, </span>${monthsArr[month]}<span> </span>${dateNumber}`;

    setTimeout(showDate, 1000);
}

// Add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set background and greeting
function setBgGreet() {
    let today = new Date();
    
    let hour = today.getHours();

    if (hour < 6) {
        document.body.style.backgroundImage = "url('assets/night/pexels-james-wheeler-1542493.jpg')";
        greeting.textContent = 'Good Night, ';
        // document.body.style.color = "white";
    } else if (hour < 12) {
        document.body.style.backgroundImage = "url('assets/morning/clock-650753_1920.jpg')";
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('assets/afternoon/pexels-bo-stevens-1046447.jpg')";
        greeting.textContent = 'Good Afternoon, ';
    } else {
        document.body.style.backgroundImage = "url('assets/evening/pexels-pixabay-278600.jpg')";
        greeting.textContent = 'Good Evening, ';
        // document.body.style.color = "white";
    }
}

// Get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = prevName;
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set name
function setName(e) {
    if (e.type === 'keypress') {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            localStorage.setItem('name', e.target.innerHTML);
            name.blur();
        }
    } else {
        if (e.target.innerText === '') {
            localStorage.setItem('name', prevName)
            e.target.innerText = prevName;
        } else {
            localStorage.setItem('name', e.target.innerText)
        }
    }
}

//Click on name place
function clickName (e) {
    if (e.target.innerHTML !== ''){
       prevName = e.target.innerHTML; 
    }
    e.target.innerHTML = '';
    localStorage.setItem('name', prevName)
}

// Get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = prevFocus;
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set focus
function setFocus(e) {
    if (e.type === 'keypress') {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            localStorage.setItem('focus', e.target.innerHTML);
            focus.blur();
        }
    } else {
        if (e.target.innerText === '') {
            localStorage.setItem('focus', prevFocus)
            e.target.innerText = prevFocus;
        } else {
            localStorage.setItem('focus', e.target.innerText)
        }
    }
}

//Click on focus place
function clickFocus (e) {
    prevFocus = e.target.innerHTML;
   e.target.innerHTML = '';
   localStorage.setItem('focus', prevFocus)
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickFocus);



//Run
showTime();
showDate(); 
setBgGreet();
getName();
getFocus();
