import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './Contacts';
import Create_contact from './Create_contact';
import { StatusBar, StyleSheet, View } from "react-native";
import CustomSearchBar from './CustomSearchBar';
import CallFeature from "./CallFeature";

const Stack = createNativeStackNavigator();
export default function Contacts_screen() {
    return (
        <>
        <Stack.Navigator>
            <Stack.Screen name="contacts" component={Contacts} options={{ headerShown: false }}/>
            <Stack.Screen name="Create_contact" component={Create_contact}/>
            <Stack.Screen name="search" component={CustomSearchBar}/>
        </Stack.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
    }
})