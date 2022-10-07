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
                form.reset();
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                alert(errorMessage);
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
                console.log(error);
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
}