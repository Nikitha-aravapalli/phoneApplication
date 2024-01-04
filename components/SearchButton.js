import { View,TouchableOpacity,Text,StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default SearchButton=(props)=>{
    const {navigation}=props;
    const handleSearch=()=>{
        console.log("navigation----------->",navigation);
        navigation.navigate("search");
        console.log("handleSearch function called");
      }
    return(
        <View style={styles.container}>
        <Icon
        name="ios-search"
        size={20}
        color="#000"
        style={{paddingLeft:10}}
      />
            <TouchableOpacity  onPress={handleSearch}  style={styles.searchButton}>
                <Text>search contacts & places</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"#808080",
        height:40,
        borderRadius:20,
        margin:20,
        alignItems:"center",
    },
    searchButton:{
        padding:10,
      },
})