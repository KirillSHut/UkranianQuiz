import { push } from "firebase/database";
import { showValidTime, openTabs, makeDisabledBtn } from "./utils";


export class Question {


    static fillStartField(questions) {

        const amount = document.querySelector('#amountOfquestions'),
            time = document.querySelector('#timeOfQuiz');
        questions.length >= 5 ? amount.textContent = questions.length + " питань" : amount.textContent = questions.length + " питання";
        Question.setTime(questions);
        showValidTime('#timeOfQuiz', true);
        if (localStorage.getItem('QuestionCounter')) {
            console.log(localStorage.getItem('QuestionCounter'));
            return
        } else if (localStorage.getItem('QuestionCounter') == null) {
            localStorage.setItem('QuestionCounter', 0);
        }
    }

    static setTime(questions) {
        if (localStorage.getItem('Time')) {
            return
        } else if (localStorage.getItem('Time') == null) {
            const time = questions.length * 30;
            localStorage.setItem('Time', time);
            document.querySelector('#timeCounter').textContent = time;
        }
    }

    static fillQuestionField(questions) {
        const title = document.querySelector('#questionName'),
            options = document.querySelectorAll('.quiz-question__form-input label'),
            counter = localStorage.getItem('QuestionCounter');
        if (counter >= questions.length) {
            return
        } else {
            title.textContent = (+counter + 1) + ". " + questions[counter].title;
            options.forEach((item, id) => item.textContent = questions[counter].answers[id][0]);
            makeDisabledBtn('#submit', true, 'rgba(206, 180, 184, 1)');
        }
    }

    static runTimer(questions) {
        const interval = setInterval(() => {
            if (localStorage.getItem('QuestionCounter') >= questions.length) {
                clearInterval(interval);
            } else if (localStorage.getItem('Time') <= 0) {
                openTabs(false, '.quiz', '.overdue')
            }
            else {
                showValidTime('#timeCounter')
                localStorage.setItem('Time', (+localStorage.getItem('Time') - 1))
            }
        }, 1000)
    }

    static nextQuestion(questions) {
        const form = document.querySelector('.quiz-question__form'),
            formdata = new FormData(form),
            obj = {};

        let counter = localStorage.getItem('QuestionCounter');

        formdata.forEach((item, i) => {
            obj[i] = item;
        });


        questions[counter].answers[obj.options].push('Choosen');

        ++counter;

        localStorage.setItem('QuestionCounter', counter);
        localStorage.setItem('UserResult', JSON.stringify(questions));

        form.reset();

        if (localStorage.getItem('QuestionCounter') >= questions.length) {
            Question.fillTheResultField();
            openTabs(false, '.quiz', '.result')
        } else {
            Question.fillQuestionField(questions);
        }

    }

    static fillTheResultField() {
        const result = JSON.parse(localStorage.getItem('UserResult')),
            resultAnswerTable = document.querySelector('#rightAnswers');
        let right = 0,
            time = (result.length * 30) - localStorage.getItem('Time');
        showValidTime('#resultTime', true, time);

        result.forEach((item => {
            item.answers.forEach((elem) => {
                if (elem.includes('Choosen')) {
                    if (elem.includes(true)) {
                        ++right;
                    }
                }
            })
        }))
        resultAnswerTable.textContent = right + ' / ' + result.length;


    }

    static async fillPriveousResult(questions) {
        try {
            const userResult = localStorage.getItem('UserResult') ? JSON.parse(localStorage.getItem('UserResult')) : false;

            const time = localStorage.getItem('Time') != null ? localStorage.getItem('Time') : questions.length * 30 + 1;
            if (userResult) {
                let counter = [];
                userResult.forEach((item, id) => {
                    item.answers.forEach((elem, i) => elem.includes('Choosen') ? counter.push(id) : false)
                })
                if ((+counter[counter.length - 1] + 1) === userResult.length) {
                    Question.fillTheResultField();
                    openTabs(false, '.start', '.result')
                } else {
                    Question.runTimer(userResult);
                    openTabs(false, '.start', '.quiz')
                }
            } else if (time < (questions.length * 30)) {
                Question.runTimer(userResult);
                openTabs(false, '.start', '.quiz')
            }
        }
        catch (e) {
        }
    }
}