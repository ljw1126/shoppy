import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {app} from "./firebase_config";
import {adminUser} from "./database";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};

export function login() {
    signInWithPopup(auth, provider)
        .catch(console.error);
}

export function logout() {
    signOut(auth);
}

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

