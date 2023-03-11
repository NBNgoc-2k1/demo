import { authentication, database } from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { GetSingleData } from './CRUD_API'

export async function RegisterAPI(newUser, password) {
    // Create a new user with Firebase
    await createUserWithEmailAndPassword(authentication, newUser.userEmail, password).then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
            displayName: `${newUser.lastName} ${newUser.firstName}`,
        })
        setDoc(doc(database, "users", userAuth.user.uid), newUser)
        LoginAPI(newUser.userEmail, password)
    }).catch((error) => {
        alert(error.message)
    })
}

export function LogoutAPI() {
    authentication.signOut().then(() => {
        localStorage.removeItem('currentUser')
    })
}

export function LoginAPI(email, password,clearPass,closePopup) {

    signInWithEmailAndPassword(authentication, email, password)
        .then((userAuth) => {
            GetSingleData('users', userAuth.user.uid).then((user) => {
                localStorage.setItem('currentUser',JSON.stringify({...user,uid: userAuth.user.uid}))
                window.location.reload()
            })
            closePopup()
        })
        // display the error if any
        .catch((err) => {
            clearPass()
            alert(err.message)
        });
}
