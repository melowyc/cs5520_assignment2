import { FlatList, StyleSheet, Text, View } from 'react-native'

import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={expenses}
                renderItem={({item}) => {
                    return (
                        <ExpenseItem expense={item} />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        minWidth: '80%'
    },
    expensetext: {
        color: 'black',
    }
});