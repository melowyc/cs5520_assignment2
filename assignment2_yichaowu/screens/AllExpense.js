import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import { collection, onSnapshot } from 'firebase/firestore';

import Column from '../components/Column';
import ExpenseList from '../components/ExpenseList';
import Colors from '../constants/Colors';

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
        backgroundColor: Colors.lightpurple,
        alignItems: 'center',
    },
});
