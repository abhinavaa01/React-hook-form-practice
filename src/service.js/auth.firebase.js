import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config.firebase";

export const login = (email, pass) => {
    // login
    return signInWithEmailAndPassword(auth, email, pass);
}

export const logout = () => {
    return auth.signOut();
}

export const createAccount = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
}

export const returnCurrentUser = () => {
    return auth.currentUser;
}