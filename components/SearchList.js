import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { getDataFromLocalStorage } from "./utilities/LocalStorage";
import CustomSearchBar from "./CustomSearchBar";
import { useFocusEffect } from "@react-navigation/native";

export default SearchList = ({ navigation, recentsFlag}) => {
  //console.log("props----------------------------------------------------------------->",props?.recentsFlag);
  console.log("recentsFlag", recentsFlag);
  console.log("navigation", navigation);
  const [search, setSearch] = useState("");
  const [originalList, setoriginalList] = useState([]);
  const [contactsts, setContactsts] = useState([]);


  const getData = async (key) => {
    let list1 = await getDataFromLocalStorage(key);
    setoriginalList(list1);
    if(!recentsFlag){
      setContactsts(list1);
    }
  };

  const handleSearch = (text) => {
    console.log("handleSearch text", text);
    setSearch(text);
  };

  useFocusEffect(useCallback(() => {
    getData("data");
    console.log("useeffect with empty dependency called");
  }, []))


  useEffect(() => {
    if (search) {
      console.log("originalList", originalList);
      console.log(
        "useeffect called typeof search is",
        typeof search,
        "search value is",
        search
      );
      const output = originalList?.filter((user) => {
        let username = user.name?.toLowerCase();
        let phone = user.phone;
        if (typeof phone == "number") {
          phone = String(phone);
        }
        if(recentsFlag){
          return (
            user.count&&(username.includes(search.toLowerCase()) || phone?.includes(search))
          );
        }
        else{
          return (
            username.includes(search.toLowerCase()) || phone?.includes(search)
          );
        }
      });
      sortFunc(output);
      setContactsts(output);
    } else {
      if(!recentsFlag){
      setContactsts(originalList);
      }
      else{
        const list1=originalList?.filter((item)=>{
          return item.count>0;
        })
        setContactsts(list1);
      }
    }
  }, [search, originalList]);

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

  const handleEdit = (item) => {
    console.log("handleEdit is called");
    console.log("user", item);
    navigation.navigate("CreateContact", {
      name: item.name,
      phone: item.phone,
      uri: item.uri,
      id: item.id,
      isEditUserInfo: true,
    });
  };
 console.log("original list",originalList,"contacts",contactsts);
  return (
    <SafeAreaView>
      <CustomSearchBar
        placeholder="Search contacts & places"
        Customstyles={styles.search_containter}
        searchValue={search}
        searchFunc={handleSearch}
      />

      <FlatList
        data={contactsts}
        ItemSeparatorComponent={<View style={{ height: 10 }}></View>}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <View style={styles.listContainer}>
                {item.uri ? (
                  <Image src={item.uri} style={styles.uriContainer} />
                ) : (
                  <Text
                    style={[
                      styles.uriContainer,
                      { textAlign: "center", fontSize: 20 },
                    ]}
                  >
                    {item?.name[0]}
                  </Text>
                )}
                <View style={styles.nameContainer}>
                  <Text>{item?.name}</Text>
                  <Text>{item?.phone}</Text>
                  {recentsFlag === "true" ? (
                    <View style={styles.recentCallContainer}>
                      <Text>{item.recent_call.split(",")[0]}</Text>
                      <Text style={{ marginLeft: 20 }}>
                        {item.recent_call.split(",")[1]}
                      </Text>
                      <Text
                        style={[
                          styles.countContainer,
                          { textAlign: "center" },
                          { marginLeft: item.count > 0 ? 20 : 131 },
                        ]}
                      >
                        {item?.count}
                      </Text>
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text>No data in the list</Text>}
      />
    </SafeAreaView>
  );
};
//

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
    paddingTop: 5,
  },
  listContainer: {
    flexDirection: "row",
  },
  nameContainer: {
    marginLeft: 15,
    marginTop: 2,
  },
  recentCallContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countContainer: {
    backgroundColor: "lightblue",
    color: "white",
    borderRadius: 10,
    height: 20,
    width: 20,
  },
});
