import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot, getDocs, query, where } from 'firebase/firestore';

import Column from '../components/Column';
import ExpenseList from '../components/ExpenseList';
import Colors from '../constants/Colors';

export default function ImportantExpense() {
    const [ImportantExpenses, setImpoortantExpenses] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, "expenses"), where("important", "==", true));
        const unsubscribe = onSnapshot(
                q, (querySnapshot) => {
                if (querySnapshot.empty) {
                    setImpoortantExpenses([]);
                    return;
                }
                setImpoortantExpenses(
                    querySnapshot.docs.map((snapDoc) => {
                        let data = snapDoc.data();
                        data = { ...data, key: snapDoc.id };
                        return data;
                    })
                );
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Column style={styles.container}>
            <ExpenseList expenses={ImportantExpenses} />
        </Column>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        alignItems: 'center',
    },
});

