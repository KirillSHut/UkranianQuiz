import { showValidTime, openTabs } from "./utils";


export class Question {


    static fillStartField(questions) {

        const amount = document.querySelector('#amountOfquestions'),
            time = document.querySelector('#timeOfQuiz');

        questions.length >= 5 ? amount.textContent = questions.length + " питань" : amount.textContent = questions.length + " питання";
        Question.setTime(questions);
        showValidTime('#timeOfQuiz', true);
        localStorage.setItem('QuestionCounter', 0);
    }

    static setTime(questions) {
        const time = questions.length * 30;
        localStorage.setItem('Time', time);
    }

    static fillQuestionField(questions) {
        const title = document.querySelector('#questionName'),
            options = document.querySelectorAll('.quiz-question__form-input label'),
            counter = localStorage.getItem('QuestionCounter');
        title.textContent = (+counter + 1) + ". " + questions[counter].title;
        options.forEach((item, id) => item.textContent = questions[counter].answers[id][0]);
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
            openTabs(false, '.quiz', '.result')
        } else {
            Question.fillQuestionField(questions);
        }
    }
}