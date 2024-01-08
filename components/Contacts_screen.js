import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './Contacts';
import CreateContact from './CreateContact';
import SearchList from '../components/SearchList';
import CallFeature from "./CallFeature";

const Stack = createNativeStackNavigator();
export default function Contacts_screen() {
    return (
        <>
        <Stack.Navigator>
            <Stack.Screen name="contacts" component={Contacts} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateContact" component={CreateContact} initialParams={{tabScreenProp:"contact"}}/>
            <Stack.Screen name="search" component={SearchList}/>
        </Stack.Navigator>
        </>
    )
}