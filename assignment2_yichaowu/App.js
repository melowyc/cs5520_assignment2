import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import AllExpense from './screens/AllExpense';
import ImportantExpense from './screens/ImportantExpense';
import AddExpense from './screens/AddExpense';
import EditExpense from './screens/EditExpense';
import Colors from './constants/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({navigation}) {
    return (
        <Tab.Navigator
            screenOptions={({ navigation, route }) => {
                return {
                    headerStyle: { backgroundColor: Colors.purple },
                    headerTintColor: 'white',
                    tabBarStyle: { backgroundColor: Colors.purple },
                    tabBarActiveTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        return <Button
                            onPress={() => navigation.navigate('AddExpense')}
                            title="+"
                            color="white"
                        />
                    }
                }
            }}
        >
            <Tab.Screen name="All Expenses" component={AllExpense}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />,
                    headerTitle: "All Expenses",
                }}
            />
            <Tab.Screen name="Important Expenses" component={ImportantExpense}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="new" size={size} color={color} />,
                    headerTitle: "Important Expenses",
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
                <Stack.Screen name="AddExpense" component={AddExpense} 
                    options={{
                        headerStyle: { backgroundColor: Colors.purple },
                        headerTintColor: 'white',
                        tabBarStyle: { backgroundColor: Colors.purple },
                        tabBarActiveTintColor: 'white',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen name="EditExpense" component={EditExpense} 
                    options={{
                        headerStyle: { backgroundColor: Colors.purple },
                        headerTintColor: 'white',
                        tabBarStyle: { backgroundColor: Colors.purple },
                        tabBarActiveTintColor: 'white',
                        headerTitleAlign: 'center',
                    }}
                />
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
