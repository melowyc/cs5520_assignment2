import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

import { firestore } from "./firebase-setup";

export async function writeToDB(expense) {
    try {
        await addDoc(collection(firestore, "expenses"), expense);
        console.log("finish inside firebase");
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "expense", key));
    } catch (err) {
        console.log(err);
    }
}