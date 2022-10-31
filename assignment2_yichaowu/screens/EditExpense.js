import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { deleteFromDB, editImportantTrueFromDB, editImportantFalseFromDB } from '../firebase/firestore';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

/* Components */

import MyButton from '../components/MyButton';
import Column from '../components/Column';


export default function EditExpense({ navigation, route }) {
    const expense = route.params.expenseObject;


    /* Methods */
    function alert_MarkImportant() {
        if (expense.important) {
            Alert.alert("This is already marked Important", "Do you want to mark this as unimportant?", [
                { text: "No", style: "cancel", onPress: f_nothingHappen },
                { text: "Yes", style: "default", onPress: f_MarkUnImportant }
            ]);
        }
        else{
            Alert.alert("Important", "Are you sure you want to mark this as important?", [
            { text: "No", style: "destructive", onPress: f_nothingHappen },
            { text: "Yes", style: "default", onPress: f_MarkImportant }
            ]);
        }
    }

    function alert_Delete() {
        Alert.alert("Delete", "Are you sure you want to mark this as important?", [
            { text: "No", style: "cancel", onPress: f_nothingHappen },
            { text: "Yes", style:'default', onPress: f_Delete }
        ]);
    }

    function f_nothingHappen() {
        return ;
    }

    async function f_MarkImportant() {
        await editImportantTrueFromDB(expense.key);
        console.log("marked important", expense.key);
        navigation.goBack();
    }

    async function f_MarkUnImportant() {
        await editImportantFalseFromDB(expense.key);
        console.log("marked unimportant", expense.key);
        navigation.goBack();
    }

    async function f_Delete() {

        console.log("delete pressed ", expense.key);
        await deleteFromDB(expense.key);
        navigation.goBack();
    }

    return (
        <View style={styles.form}>
            <Column style={styles.buttonsContainer}>
                <MyButton style={styles.buttons} onPress={alert_MarkImportant}>Mark as improtant</MyButton>
                <MyButton style={styles.buttons} onPress={alert_Delete}>Delete</MyButton>
            </Column>
        </View>

    );
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-evenly',
    },
    form: {
        marginTop: 70,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 12,
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 10,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },
    invalidInput: {
        color: 'tomato',
        marginLeft: 6
    }
});