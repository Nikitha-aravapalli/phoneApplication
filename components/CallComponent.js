import { View, Text ,TouchableOpacity,Linking,Platform} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faPhoneVolume,
  } from "@fortawesome/free-solid-svg-icons";
import React,{useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CallComponent(props) {
    const {route,navigation}=props;
    const [dateFormat,setDateFormat]=useState();
    const [timeFormat,setTimeFormat]=useState();
    const [list,setList]=useState([]);
    const handleCall=()=>{
      var date=new Date().getDate();
      var month=new Date().getMonth()+1;
      var year=new Date().getFullYear();
      var hours=new Date().getHours();
      var minutes=new Date().getMinutes();
      var seconds=new Date().getSeconds();
      setDateFormat(date+"-"+month+"-"+year);
      console.log("dateFormat is ----------------------------------------------------",dateFormat);
      setTimeFormat(hours+":"+minutes+":"+seconds);
      console.log("timeFormat is ----------------------------------------------------",timeFormat);
      console.log("date is",date,month,year,hours,minutes,seconds);
      if(Platform.OS==="android"){
        console.log("entered into android if condition");
        console.log("route in handleCall",route);
        const string="tel:"+route.params.phone;
        Linking.openURL(string);
      }
      else{
        const string=`telprompt:${route.params.phone}`;
        Linking.openURL(string);
      }
      //navigation.navigate("call");
        console.log("handleCall is called");
    }
    useEffect(()=>{
      console.log("dateFormat is ----------------------------------------------------",dateFormat);
      console.log("timeFormat is ----------------------------------------------------",timeFormat);
    },[dateFormat,timeFormat])
  return (
    <View>
      <TouchableOpacity style={{ margin: 30 }} onPress={handleCall}>
        <FontAwesomeIcon icon={faPhoneVolume} />
      </TouchableOpacity>
    </View>
  );
};
