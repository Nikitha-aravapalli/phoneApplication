import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "./utilities/LocalStorage";
import { setDataToLocalStorage } from "./utilities/LocalStorage";

export default function CallComponent(props) {
  const { route, navigation } = props;
  const [list2, setList2] = useState([]);
  const name = route.params.name;
  const phone = route.params.phone;
  const id = route.params.id;
  const uri = route.params.uri;
  let recent_call=route.params.recent_call;
  //const count=route.params.count;
  console.log("route params", route.params);
  console.log("name,phone,id,uri", name, phone, id, uri);
  const handleCall = async() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    recent_call=
      date +
        "-" +
        month +
        "-" +
        year +
        "," +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

    if (Platform.OS === "android") {
      const string = "tel:" + route.params.phone;
      Linking.openURL(string);
    } else {
      const string = `tel:${route.params.phone}`;
      Linking.openURL(string);
    }
    //navigation.navigate("call");
    console.log("handleCall is called");
    updateList("data");
  };

  /*useEffect(() => {
    console.log("recentCall", recent_call);
    count=count + 1;
    console.log("useeffect1 called");
  }, [recent_call]);

  useEffect(() => {
    console.log("useeffect2 called");
    console.log("count",count);
    handleList1();
  }, [count]);*/

  //////////////////////////////doubt
  /*useEffect(()=>{
    console.log("list 2 is--------------------------------------->",list2);
  },[list2])*/

  useEffect(()=>{
    getList("data");
  },[])

  const getList = async (key) => {
    const list = await getDataFromLocalStorage(key);
    setList2(list);
  };

  const updateList = async (key) => {
    console.log("key", key);
    console.log("list is",list2);
    const list1 = list2.map((user) => {
      if (user.id === id) {
        user.count = user.count+1;
        user.recent_call = recent_call;
      }
      return user;
    });
    console.log("total_list after update", list1);
    await setDataToLocalStorage("data", list1);
    await getList("data");
    console.log("after setting list in localstorage------------------------------", list2);
  };

  return (
    <View>
      <TouchableOpacity style={{ margin: 30 }} onPress={handleCall}>
        <FontAwesomeIcon icon={faPhoneVolume} />
      </TouchableOpacity>
    </View>
  );
}
