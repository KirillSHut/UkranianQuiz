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