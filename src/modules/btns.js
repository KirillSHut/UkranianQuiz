import { openTabs } from './utils';
import { Question } from './question';

export function buttonWork() {


    const signBtns = document.querySelectorAll('#signBtn'),
        registrationTab = document.querySelector('.registration'),
        signInBtn = registrationTab.querySelector('#signInBtn'),
        againBtns = document.querySelectorAll('#again');


    againBtns.forEach((item) => {
        item.addEventListener('click', () => {
            localStorage.setItem('UserResult', '')
            location.reload()
        })
    })

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