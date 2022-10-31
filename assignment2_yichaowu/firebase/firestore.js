import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase-setup";
import { useState } from 'react';

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
        await deleteDoc(doc(firestore, "expenses", key));
    } catch (err) {
        console.log(err);
    }
}


export async function editImportantTrueFromDB(key) {
    try {
        await updateDoc(doc(firestore, "expenses", key), { important: true });
    } catch (err) {
        console.log(err);
    }
}

export async function editImportantFalseFromDB(key) {
    try {
        await updateDoc(doc(firestore, "expenses", key), { important: false });
    } catch (err) {
        console.log(err);
    }
}