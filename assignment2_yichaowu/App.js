import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AllExpense from './screens/AllExpense';
import ImportantExpense from './screens/ImportantExpense';
import AddExpense from './screens/AddExpense';
import EditExpense from './screens/EditExpense';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function Home({navigation}) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All" component={AllExpense}
                options={{
                    headerTitle: "All Expenses",
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('AddExpense')}
                            title="+"
                            color="black"
                        />
                    ),
                }}
            />
            <Tab.Screen name="Important" component={ImportantExpense}
                options={{
                    headerTitle: "Important Expenses",
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('EditExpense')}
                            title="+"
                            color="black"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="AddExpense" component={AddExpense} />
                <Stack.Screen name="EditExpense" component={EditExpense} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginTop: 70,
    },
    buttons: {
        marginHorizontal: 8,
        minWidth: 100,
    },

    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 12,
    },
});
