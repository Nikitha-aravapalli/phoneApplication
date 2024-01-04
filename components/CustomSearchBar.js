import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import React, { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "./utilities/LocalStorage";

export default CustomSearchBar = ({ navigation }) => {
  console.log("navigation",navigation);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);

  const getData = async () => {
    let list1 = await getDataFromLocalStorage();
    setList(list1);
  };

  const handleSearch = async (text) => {
    setSearch(text);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("list", list);
    const output = list?.filter((user) => {
      let username = user.name?.toLowerCase();
      console.log("username", username);
      console.log("phone-----------",user.phone,"type",typeof(user.phone),"searchtext",search,"typeofsearch",typeof(search));
      let phone=user.phone
      if(typeof(phone)=="number"){
        phone=String(phone)
      }
      return username.includes(search.toLowerCase()) || phone?.includes(search);
    });
    sortFunc(output);
    setFilteredList(output);
  }, [search, list]);

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

  const handleEdit=(item)=>{
    console.log("handleEdit is called");
    console.log("user",item);
    navigation.navigate("Create_contact",{
      name: item.name,
      phone: item.phone,
      uri: item.uri,
      id: item.id,
      isEditUserInfo: true,
    })
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search contacts & places"
        style={styles.search_containter}
        value={search}
        onChangeText={(text) => handleSearch(text)}
      />

      {filteredlist ? (
        <FlatList
          data={filteredlist}
          ItemSeparatorComponent={<View style={{ height: 10 }}></View>}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={()=>handleEdit(item)}>
                <View style={styles.listContainer}>
                  {item.uri?
                  (<Image src={item.uri} style={styles.uriContainer}/>):
                  <Text
                    style={[
                      styles.uriContainer,
                      { textAlign: "center", fontSize: 20 },
                    ]}
                  >
                    {item?.name[0]}
                  </Text>}
                  <View style={styles.nameContainer}>
                    <Text>{item?.name}</Text>
                    <Text>{item?.phone}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      ) : (
        <Text>no data in the list</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search_containter: {
    height: 30,
    backgroundColor: "#808080",
    borderRadius: 20,
    margin: 10,
  },
  uriContainer: {
    backgroundColor: "pink",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    overflow: "hidden",
    paddingTop:5,
  },
  listContainer: {
    flexDirection: "row",
  },
  nameContainer: {
    marginLeft: 15,
    marginTop:2,
  },
});
