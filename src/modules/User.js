import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export class User {

    static singUp(e) {
        e.preventDefault();

        const auth = getAuth(),
            form = document.querySelector('.registration__form'),
            username = document.querySelector('#regUsername').value,
            password = document.querySelector('#regPassword').value;

        createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);
                User.renderError("Ви успішно зареєструвалися")
                form.reset();
            })
            .catch((error) => {
                User.renderError("Виникла помилка, можливо ви ввели не коректні данні")
                form.reset();
            })
    }

    static singIn(e) {
        e.preventDefault();

        const auth = getAuth(),
            form = document.querySelector('.registration__form'),
            username = document.querySelector('#inUsername').value,
            password = document.querySelector('#inPassword').value;

        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                User.setUserSettings(user.email, user.uid);
                document.querySelector('.registration__form').reset();
                form.reset();
            })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                User.renderError("Виникла помилка, можливо ви ввели не коректні данні")
                form.reset();
            })
    }

    static setUserSettings(email, uid) {
        localStorage.setItem('UserEmail', email);
        localStorage.setItem('UserUid', uid);
    }

    static postUserResult(data, time) {
        const db = getDatabase();
        set(ref(db, 'users/' + localStorage.getItem('UserUid')), {
            userResult: data,
            time: time
        });
    }

    static renderError(error) {
        const div = document.createElement('div'),
            innerDiv = document.createElement('div'),
            bg = document.createElement('div');
        div.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        `;
        div.id = 'errorTab';
        bg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: grey;
        opacity: 0.5;
        z-index: 9;
        `;

        innerDiv.innerHTML = `<p>${error}</p>`;
        innerDiv.style.cssText = `
        width: 300px;
        height: 100px;
        display: flex;
        padding: 0px 10px 0px 10px;
        justify-content: center;
        align-items: center;
        z-index: 10;
        background-color: #fff;
        opacity: 1;
        border-radius: 20px;
        `;
        div.append(innerDiv);
        div.append(bg);
        document.body.append(div);
        setTimeout(() => {
            document.querySelector('#errorTab').remove()
        }, 3000)
    }
}