import { openTabs, clearInput, pushUserClue, makeSingAble } from './utils';
import { Question } from './Question';
import { User } from './User';

export function buttonWork() {


    const signBtns = document.querySelectorAll('#signBtn'),
        registrationTab = document.querySelector('.registration'),
        signInBtn = registrationTab.querySelector('#signInBtn'),
        againBtns = document.querySelectorAll('#again'),
        singUp = document.querySelector('#singUp'),
        singIn = document.querySelector('#singIn'),
        eye = document.querySelectorAll('#eye'),
        userNameInputList = document.querySelectorAll('[data-username]'),
        passwordInputList = document.querySelectorAll('[data-password]'),
        registerBtns = document.querySelectorAll('[data-registerBtn]');


    singUp.addEventListener('click', (e) => {
        User.singUp(e);
        e.target.disabled = true;
    });

    singIn.addEventListener('click', (e) => {
        User.singIn(e);
        e.target.disabled = true;
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
        clearInput()
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

    // Registration

    eye.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.parentNode.querySelector('input').getAttribute('type') == 'password') {
                e.target.classList.add('view');
                e.target.parentNode.querySelector('input').setAttribute('type', 'text')
            } else {
                e.target.classList.remove('view');
                e.target.parentNode.querySelector('input').setAttribute('type', 'password')
            }
        })
    })

    userNameInputList.forEach(item => {
        item.addEventListener('click', (e) => {
            if (document.querySelector('.userClue') != null) {
                return
            } else {
                pushUserClue('Будь ласка, введіть коректну пошту за зразком example@email.net', document.querySelectorAll('.registration__input-email'), 'userClue');
            }
        })
        item.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\s/ig, '')
            makeSingAble()
        })
        item.addEventListener('change', () => {
            document.querySelectorAll('.userClue').forEach(item => item.remove())
        })
    })
    passwordInputList.forEach(item => {
        item.addEventListener('click', (e) => {
            if (document.querySelector('.userCluePassword') != null) {
                return
            } else {
                pushUserClue('Пароль може містити лише числові значення', document.querySelectorAll('.registration__input-password'), 'userCluePassword');
            }
        })
        item.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/ig, '')
            makeSingAble()
        })
        item.addEventListener('change', () => {
            document.querySelectorAll('.userCluePassword').forEach(item => item.remove())
        })
    })

}