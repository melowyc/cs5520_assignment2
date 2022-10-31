import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

/* State Related */
import { useDispatch } from 'react-redux';
import { addExpenseFn } from '../../../store/slices/expenses';


/* Components */
import Input from './Input';
import Row from './Row';
import MyButton from '.MyButton';



export default function ExpenseForm({ onCancelFn, confirmLabel, onConfirmFn, expense }) {

    /* Hooks and variables */
    const [inputs, setInputs] = useState({
        amount: {
            value: expense ? expense.amount.toString() : '',
            isValid: true,
        },
        description: {
            value: expense ? expense.description : '',
            isValid: true,
        }
    });
    const formIsValid = (inputs.amount.isValid && inputs.description.isValid);

    const amountProps = {
        keyboardType: 'decimal-pad',
        onChangeText: (input) => {
            inputChangeHandler('amount', input);
        },
        value: inputs.amount.value
    };
    const descriptionProps = {
        multiline: true,
        autoCorrect: false,
        onChangeText: (input) => {
            inputChangeHandler('description', input);
        },
        value: inputs.description.value
    };
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /* Methods */
    function inputChangeHandler(identifier, input) {
        /* 
        ||	identifier['amount', 'date', 'description']
        ||	the [identifier]: input is a standard js. it allows us to set and target a property dinamically. 
        ||	in this case, whatever the identifier is, it will override the spread currentValues so we only 
        ||	change the value of identified property
        */

        setInputs((currentValue) => {
            return {
                ...currentValue,
                [identifier]: { value: input, isValid: true },
            }
        });

        // console.log(inputs);
    }

    function trySubmitForm() {
        const expenseData = {
            amount: parseFloat(inputs.amount.value),
            description: inputs.description.value,
        }

        const amountIsValid = (!isNaN(expenseData.amount) && expenseData.amount > 0);
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (amountIsValid && descriptionIsValid) {
            onConfirmFn(expenseData);
        } else {
            /* Show some feedback */


            setInputs((crnt) => {
                return {
                    amount: { value: crnt.amount.value, isValid: amountIsValid },
                    date: { value: crnt.date.value, isValid: dateIsValid },
                    description: { value: crnt.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }

    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <Row style={styles.row}>
                <Input label="Amount" inputProps={amountProps} valid={inputs.amount.isValid} />
                {/* <Input label="Date" inputProps={dateProps} valid={inputs.date.isValid} /> */}
            </Row>
            <Input label="Description" inputProps={descriptionProps} valid={inputs.description.isValid} />

            {(!formIsValid) && <Text style={styles.invalidInput}>Invalid inputs - Please check entered data</Text>}

            <Row style={styles.buttonsContainer}>
                <MyButton style={styles.buttons} mode="flat" onPressFn={onCancelFn}>Cancel</MyButton>
                <MyButton style={styles.buttons} onPressFn={trySubmitForm}>{confirmLabel}</MyButton>
            </Row>
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