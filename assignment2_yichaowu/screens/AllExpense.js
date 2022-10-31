import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getExpenses } from '../firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

import Column from '../components/Column';
import ExpenseList from '../components/ExpenseList';




export default function AllExpense({ navigation }) {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(firestore, "expenses"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    setExpenses([]);
                    return;
                }
                setExpenses(
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
            <ExpenseList expenses={expenses} />
        </Column>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightpurple',
        alignItems: 'center',
    },
});
