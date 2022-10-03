export function openTabs(e, close, show) {
    if (e) {
        e.preventDefault();
    }
    document.querySelector(close).classList.add('hide');
    document.querySelector(show).classList.remove('hide');
}

export function showValidTime(selector, isStat) {
    const time = localStorage.getItem('Time'),
        tab = document.querySelector(selector);
    if (time >= 60) {
        const minutes = Math.floor(time / 60),
            seconds = time % 60;
        isStat ? tab.textContent = minutes + 'хвилин' + seconds + 'секунд' : tab.textContent = minutes + ':' + seconds;
    } else {
        isStat ? tab.textContent = time + ' секунд' : tab.textContent = time;
    }
}

export function makeDisabledBtn(selector, isDisable) {
    const btn = document.querySelector(selector);
    if (isDisable) {
        btn.disabled = true;
        btn.style.backgroundColor = 'grey';
    } else {
        btn.disabled = false;
        btn.style.backgroundColor = '';
    }
} 