import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recents from "./Recents";
import CreateContact from "./CreateContact";
const Stack=createNativeStackNavigator();
export default function Recents_screen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Recents" component={Recents}/>
            <Stack.Screen name="CreateContact" component={CreateContact} initialParams={{ tabScreenProp: 'recents' }}/>
        </Stack.Navigator>
    )
}