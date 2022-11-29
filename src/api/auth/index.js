import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { regionMenuOptions } from "../../components/CountrySelector";
import { auth, db } from '../firebase'

export const createUser = async (email, password, country, phoneNumber) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        set(ref(db, `users/${userCredential.user.uid}`), {
            email: email,
            country: country,
            statsRegion: regionMenuOptions.find(region => country.code === region.code) || { code: "FR", code3: "FRA", label: "France" },
            phoneNumber: phoneNumber
        });
        return 200;
    } catch (error) {
        console.error(error.message)
        return Promise.reject(error);
    }
}

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return "success";
    }
    catch (error) {
        console.error(error)
        return Promise.reject(error.code);
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
        return 200;
    } catch (error) {
        return Promise.reject(error.code);
    }
}