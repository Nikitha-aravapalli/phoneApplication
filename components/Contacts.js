import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform
} from "react-native";
import contacts_list from "../contacts_info.json";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import SearchButton from "./SearchButton";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";


export default function Contacts(props) {
    const { navigation } = props;
    //console.log("props=========",props);
      const [localList, setLocalList] = useState([]);
  const fetchScreenData = async () => {
    try {
      let list1 = await AsyncStorage.getItem("data");
      list1 = JSON.parse(list1);
      console.log("localstorage data", list1);
      if (!list1) {
        await AsyncStorage.setItem("data", JSON.stringify(contacts_list));
        sortFunc(contacts_list);
        setLocalList(contacts_list);
      } else {
        sortFunc(list1);
        setLocalList(list1);
        console.log("type of localstorage list1", list1, typeof list1);
        console.log("data is already present");
      }
    } catch (error) {
      console.log("error is", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchScreenData();
    }, [])
  );


  const AddNewUser = () => {
    navigation.navigate("CreateContact", { isCreateUserInfo: true });
  };
  const EditUser = (item) => {
    console.log("Edit user function is called");
    console.log("item which is clicked", item.name, item.uri, item.phone,item.recent_call,item.count);
    navigation.navigate("CreateContact", {
      name: item.name,
      phone: item.phone,
      uri: item.uri,
      id: item.id,
      recent_call:item.recent_call,
      count:item.count,
      isEditUserInfo: true,
    });
  };

  const sortFunc = (list) => {
    list?.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <SafeAreaView
      style={{ marginTop: StatusBar.currentHeight }}
    >

    <SearchButton navigation={navigation}/>
     
      <TouchableOpacity onPress={AddNewUser}>
        <View style={styles.create_container}>
      <FontAwesomeIcon icon={faUserPlus}/>
        <Text style={[styles.createText,{fontSize:15}]}>Create new contact</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={localList}
        ItemSeparatorComponent={<View style={{ height: 10 }}></View>}
        renderItem={({ item }) => {
          return (
            <View style={styles.list_container}>
              <TouchableOpacity onPress={() => EditUser(item)}>
                <View style={styles.profileContainer}>
                {item.uri?<Image src={item.uri} style={styles.profileUri}></Image>:<Text style={[styles.profileUri,{textAlign:"center",textAlignVertical:"center",fontSize:20}]}>{item.name[0]}</Text>}
                <Text style={styles.profileText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  list_container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  create_container:{
    flexDirection:"row",
    //alignItems:"center",
    //justifyContent:"center",
    marginLeft:25,
    marginBottom:10,
  },
  createText:{
    paddingLeft:10,
  },
  profileContainer:{
    flexDirection:"row",
    paddingLeft:20,
  },
  profileUri:{
    backgroundColor:"pink",
    borderRadius:20,
    width:40,
    height:40,
    overflow: 'hidden' ,
    paddingTop:Platform.OS==="ios"?7:0,
  },
  profileText:{
    paddingLeft:20,
    fontSize:20,
  }
});
