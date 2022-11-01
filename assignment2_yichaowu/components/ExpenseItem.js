import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Row from './Row';
import Colors from '../constants/Colors';

export default function ExpenseItem({ expense }) {

    const navigation = useNavigation();

    function editExpense() {
        navigation.navigate('EditExpense', {
            expenseObject: expense
        });
        console.log(expense.key);
    }

    return (
        <Pressable onPress={editExpense} style={({ pressed }) => [
            pressed ? styles.pressed : null,
        ]}>
            <Row style={[styles.row, styles.expenseItem]}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>{expense.text}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{expense.amount}</Text>
                </View>
            </Row>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
    },
    expenseItem: {
        padding: 10,
        backgroundColor: Colors.purple,
        marginVertical: 4,
        borderRadius: 6,
        elevation: 3,
        shadowColor: Colors.shadow,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4

    },
    textBase: {
        color: 'white'
    },
    amount: {
        color: Colors.purple,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    }
});