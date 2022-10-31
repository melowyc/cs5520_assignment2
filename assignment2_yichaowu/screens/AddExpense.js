import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { writeToDB, deleteFromDB } from '../firebase/firestore';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';

/* Components */

import MyButton from '../components/MyButton';
import Row from '../components/Row';
import Input from '../components/Input';
import Column from '../components/Column';


export default function AddExpense({ navigation }) {
    /* Hooks and variables */
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         collection(firestore, "expenses"),
    //         (querySnapshot) => {
    //             if (querySnapshot.empty) {
    //                 setExpenses([]);
    //                 return;
    //             }
    //             setExpenses(
    //                 querySnapshot.docs.map((snapDoc) => {
    //                     let data = snapDoc.data();
    //                     data = { ...data, key: snapDoc.id };
    //                     return data;
    //                 })
    //             );
    //         }
    //     );
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    async function f_Submit() {
        // const expenseData = {
        //     id: Math.floor(Math.random() * 100000000),
        //     amount: parseFloat(amount),
        //     // date: moment(inputs.date.value).format('YYYY-MM-DD'),
        //     description: text,
        //     important: false
        // }

        const amountIsValid = (!isNaN(amount) && amount > 0);
        const descriptionIsValid = text.length > 0;

        if (amountIsValid && descriptionIsValid) {
            console.log("submit")
            await writeToDB({ 
                text: text,
                amount: amount,
                important: false
            });
            console.log("finish write")
            navigation.goBack();

        } else {
            Alert.alert("Invalid input", "Please check your input values", [
                { text: "OK", style: "destructive", onPress: f_reset }
            ]);
            return;
        }

    }

    function f_reset() {
        setText("");
        setAmount(0);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <Column style={styles.column}>
                <Input label="Amount" value={amount} f_onChange={setAmount} />
                <Input label="Description" value={text} f_onChange={setText} />
            </Column>
            


            <Row style={styles.buttonsContainer}>
                    <MyButton style={styles.buttons} onPress={() => navigation.goBack()}>Cancel</MyButton>
                    <MyButton style={styles.buttons} onPress={f_Submit}>Submit</MyButton>
            </Row>
        </View>

    );
}

const styles = StyleSheet.create({
    column: {
        flex: 1,
        minHeight: '20%'
    },
    form: {
        marginTop: 40,
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
        marginTop: 100,
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