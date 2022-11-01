import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from "react";
import { writeToDB } from '../firebase/firestore';

import MyButton from '../components/MyButton';
import Row from '../components/Row';
import Input from '../components/Input';
import Column from '../components/Column';
import Colors from '../constants/Colors';


export default function AddExpense({ navigation }) {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    async function f_Submit() {

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
        <View style={styles.container}>
            <Text style={styles.title}>Your Expense</Text>
            <Column>
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

    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        paddingTop: 30,
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
        marginTop: 80,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },
});