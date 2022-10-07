import { openTabs } from './utils';
import { Question } from './Question';
import { User } from './User';

export function buttonWork() {


    const signBtns = document.querySelectorAll('#signBtn'),
        registrationTab = document.querySelector('.registration'),
        signInBtn = registrationTab.querySelector('#signInBtn'),
        againBtns = document.querySelectorAll('#again'),
        singUp = document.querySelector('#singUp'),
        singIn = document.querySelector('#singIn');


    singUp.addEventListener('click', (e) => {
        User.singUp(e);
    });

    singIn.addEventListener('click', (e) => {
        User.singIn(e);
    })


    againBtns.forEach((item) => {
        item.addEventListener('click', () => {
            localStorage.removeItem('Time')
            localStorage.removeItem('QuestionCounter')
            localStorage.setItem('UserResult', '')
            User.postUserResult('empty', 'empty')
            location.reload()
        })
    })

    signBtns.forEach((elem) => elem.addEventListener('click', (e) => {
        if (localStorage.getItem('UserEmail') != null) {
            e.preventDefault()
            localStorage.removeItem('UserEmail')
            localStorage.removeItem('UserUid')
            location.reload()
        } else {
            openTabs(e, '.wrapper', '.registration');
            openTabs(e, '.registration__body_2', '.registration__body_1');
        }
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