import './style/style.scss';
import { openTabs, makeDisabledBtn } from './modules/utils';
import { buttonWork } from './modules/btns';
import { Question } from './modules/question';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDIW4N_7rSZHasa_dV19JZRwxTb0f3-Z_M",
    authDomain: "quiz-57070.firebaseapp.com",
    databaseURL: "https://quiz-57070-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quiz-57070",
    storageBucket: "quiz-57070.appspot.com",
    messagingSenderId: "884860875220",
    appId: "1:884860875220:web:9d47e5ba5fc8ac61aba641"
},
    app = initializeApp(firebaseConfig),
    db = getDatabase(),
    questionRef = ref(db, 'questions/');


window.addEventListener('DOMContentLoaded', () => {

    buttonWork();

    let questionList;   //Список вопросов


    const fillTabs = new Promise((resolve, reject) => { // Запрос на вопросы
        makeDisabledBtn('#startBtn', true)
        onValue(questionRef, (question) => {
            questionList = JSON.parse(JSON.stringify(question.val()));
            !questionList ? reject() : resolve();
        });
    });


    fillTabs
        .then(() => { // назначение события на кнопку старта
            document.querySelector('#startBtn').addEventListener('click', (e) => {
                Question.runTimer(questionList);
                openTabs(e, '.start', '.quiz')
            });
            document.querySelectorAll('.quiz-question__form-input input').forEach((item) => {
                item.addEventListener('change', () => {
                    makeDisabledBtn('#submit', false);
                })
            })
        })
        .then((resolve, reject) => {
            Question.fillPriveousResult(questionList);
            Question.fillStartField(questionList);

        })
        .then(() => { // Заполнение стартового окна и вопроса

            Question.fillQuestionField(questionList);

            makeDisabledBtn('#startBtn', false)
        })
        .then(() => { // Назначение оброботчика событий на кнопку submit в викторине
            document.querySelector('.quiz-question__form').addEventListener('submit', (e) => {
                e.preventDefault();
                Question.nextQuestion(questionList);
            })
        })
        .catch(() => {
            alert("Something went wrong");
        })
})