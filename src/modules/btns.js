import { openTabs } from './utils';

export function buttonWork() {


    const startBtn = document.querySelector('#startBtn'),
        signBtns = document.querySelectorAll('#signBtn'),
        registrationTab = document.querySelector('.registration'),
        signInBtn = registrationTab.querySelector('#signInBtn');



    startBtn.addEventListener('click', (e) => openTabs(e, '.start', '.quiz'));


    signBtns.forEach((elem) => elem.addEventListener('click', (e) => {
        openTabs(e, '.wrapper', '.registration');
        openTabs(e, '.registration__body_2', '.registration__body_1');
    }));


    registrationTab.addEventListener('click', (e) => {
        if (e.target.id === 'cancelBtn') {
            openTabs(e, '.registration', '.wrapper');
        } else if (e.target.id === 'registration-bg') {
            openTabs(e, '.registration', '.wrapper');
        }
    })


    signInBtn.addEventListener('click', (e) => openTabs(e, '.registration__body_1', '.registration__body_2'))
}