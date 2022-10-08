export function openTabs(e, close, show) {
    if (e) {
        e.preventDefault();
    }
    document.querySelector(close).classList.add('hide');
    document.querySelector(show).classList.remove('hide');
}

export function showValidTime(selector, isStat, time) {
    time = time || localStorage.getItem('Time')
    const tab = document.querySelector(selector);
    if (time > 60) {
        const minutes = Math.floor(time / 60),
            seconds = time % 60;
        if (isStat) {
            if (seconds === 0) {
                tab.textContent = minutes + ' хвилин';
            } else {
                tab.textContent = minutes + ' хвилин ' + seconds + ' секунд';
            }
        } else {
            tab.textContent = minutes + ':' + seconds;
        }
    } else {
        if (isStat) {
            if (time < 5) {
                tab.textContent = time + ' секунди';
            } else if (time === 1) {
                tab.textContent = time + ' секунда';
            }
            else {
                tab.textContent = time + ' секунд';
            }
        } else {
            tab.textContent = time;
        }
    }
}

export function makeDisabledBtn(selector, isDisable, color) {
    const btn = document.querySelector(selector);
    color = color || 'grey';
    if (isDisable) {
        btn.disabled = true;
        btn.style.backgroundColor = color;
    } else {
        btn.disabled = false;
        btn.style.backgroundColor = '';
    }
}

export function clearInput() {
    const inputList = document.querySelectorAll('.registration__form input');
    const btns = document.querySelectorAll('[data-registerBtn]');

    inputList.forEach(item => {
        item.value = '';
    })
    btns[0].disabled = true;
    btns[1].disabled = true;
}

export function pushUserClue(message, location, selector) {
    location.forEach(item => {
        item.insertAdjacentHTML('afterbegin', `<p class="${selector}">${message}</p>`);
    })
}

export function makeSingAble() {
    const inputList = document.querySelectorAll('.registration__form input');
    const btns = document.querySelectorAll('[data-registerBtn]');
    console.log(btns);
    if (inputList[0].value != '' && inputList[1].value != '') {
        console.log(1);
        btns[0].disabled = false;
    } else if (inputList[2].value != '' && inputList[3].value != '') {
        btns[1].disabled = false;
    } else {
        btns[0].disabled = true;
        btns[1].disabled = true;
    }
}