import { View, Text } from "react-native";
import SearchList from "./SearchList";
import { getDataFromLocalStorage } from "./utilities/LocalStorage";
import { setDataToLocalStorage } from "./utilities/LocalStorage";
import React,{useState,useCallback,useEffect,useLayoutEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Recents({navigation}) {
  const [list, setList] = useState([]);
  
  console.log("lists in recents tab",list);
  return (
    <View>
      <SearchList recentsFlag="true" navigation={navigation} recents_list={list}/>
    </View>
  );
}

