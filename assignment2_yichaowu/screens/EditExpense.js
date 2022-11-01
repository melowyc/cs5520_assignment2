import { StyleSheet, View, Alert } from 'react-native';
import { deleteFromDB, editImportantTrueFromDB, editImportantFalseFromDB } from '../firebase/firestore';

import MyButton from '../components/MyButton';
import Column from '../components/Column';
import Colors from '../constants/Colors';

export default function EditExpense({ navigation, route }) {
    const expense = route.params.expenseObject;

    function alert_MarkImportant() {
        if (expense.important) {
            Alert.alert("This is already marked Important", "Do you want to remove this from important expenses?", [
                { text: "No", style: "cancel", onPress: f_nothingHappen },
                { text: "Yes", style: "default", onPress: f_MarkUnImportant }
            ]);
        }
        else{
            Alert.alert("Important", "Are you sure you want to mark this as important?", [
                { text: "No", style: "default", onPress: f_nothingHappen },
            { text: "Yes", style: "default", onPress: f_MarkImportant }
            ]);
        }
    }

    function alert_Delete() {
        Alert.alert("Delete", "Are you sure you want to delete this item?", [
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
        <View style={styles.container}>
            <Column style={styles.buttonsContainer}>
                <MyButton style={styles.buttons} onPress={alert_MarkImportant}>Mark as improtant</MyButton>
                <MyButton style={styles.buttons} onPress={alert_Delete}>Delete</MyButton>
            </Column>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.lightpurple,
        alignItems: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: 40,
        marginVertical: 4,
    },
    buttons: {
        marginHorizontal: 30,
        minWidth: 200,
        marginVertical: 8,
    },
});