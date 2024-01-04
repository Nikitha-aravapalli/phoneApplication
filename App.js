import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts_screen from './components/Contacts_screen';
import Recents from './components/Recents';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Recents'>
      <Tab.Screen name="Recents" component={Recents} options={{tabBarIcon:()=>(<Icon name="clock" size={20}/>)}}/>
      <Tab.Screen name="contacts_screen" component={Contacts_screen} options={{headerShown:false,
      tabBarIcon: () => (
            <Icon name="users" size={20}/>
      ),}} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
