// DOM elements
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
let prevName = '[Enter name]';
let prevFocus = '[Enter focus]';
let imgArr = [];
let imgIndex = 0;
const adviceNext = document.getElementById('advice-next');

// Show time
function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    
    //Change background
    if (min === 0 && sec === 0) {setBackground()};
    if (hour === 0 && min === 0 && sec === 0) {randomBackground()};
    
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

//Image randomizer 
function randomBackground() {
    const periods = ['night', 'morning', 'afternoon', 'evening'];
    const random = (item) => {
        let arr = [];
        while (arr.length < 6) {
            let randomNumber = Math.ceil(Math.random() * 22);
            if (!arr.includes(randomNumber)) {
                arr.push (randomNumber);
                imgArr.push(`assets/${item}/${randomNumber}.jpg`)  
            }
        }
    }
    periods.forEach(item => random(item));
}

// Set background 
function setBackground() {
    let today = new Date();
    let hour = today.getHours();
    imgIndex = hour;
    document.body.style.backgroundImage = `url(${imgArr[imgIndex]})`;
}

// Change Background
function changeBackground() {
    if (imgIndex === 23) {imgIndex = 0}
    else {imgIndex++;}
    document.body.style.backgroundImage = `url(${imgArr[imgIndex]})`;
}

// Set greeting
function setGreet() {
    let today = new Date();
    
    let hour = today.getHours();

    if (hour < 6) {
        greeting.textContent = 'Good Night, ';
        // document.body.style.color = "white";
    } else if (hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon, ';
    } else {
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

// advice API
const advice = document.querySelector('.advice');
async function getAdvice() {  
  const url = `https://api.adviceslip.com/advice`;
  const res = await fetch(url);
  const data = await res.json(); 
  advice.textContent = data.slip.advice;
  console.log(advice.textContent);
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickFocus);
refresh.addEventListener('click', changeBackground);
document.addEventListener('DOMContentLoaded', getAdvice);
adviceNext.addEventListener('click', getAdvice);



//Run
showTime();
showDate(); 
setGreet();
getName();
getFocus();
randomBackground();
setBackground();
