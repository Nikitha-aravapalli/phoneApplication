import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
//import { GenerateUUID } from "react-native-uuid";
//import UUIDGenerator from 'react-native-uuid-generator';
import uuid from "react-native-uuid";
import Icon from "react-native-ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPhone,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CallComponent from "./CallComponent";

const FORM_FIELDS = {
  firstname: "firstname",
  lastname: "lastname",
  phone: "phone",
};

export default function Create_contact({ route, navigation }) {
  const [newContact, setNewContact] = useState({
    firstname: "",
    lastname: "",
    uri: "",
    phone: "",
  });
  const [error, setError] = useState({});
  //const [list, setList] = useState([]);
  const { name = "", phone = "", uri = "", id = " " } = route?.params ?? {};
  const { isCreateUserInfo = false } = route?.params;
  const { isEditUserInfo = false } = route?.params;
  console.log("route=====", route);
  console.log("parameters from contact screen", name, phone, uri, id);

  //splitting firstname and lastname
  const nameArray = name.split(" ");
  console.log("firstname and lastnames are", nameArray);

  const updateNewContact = () => {
    if (isEditUserInfo) {
      console.log("entering1");
      setNewContact({
        ...newContact,
        firstname: nameArray[0],
        lastname: nameArray[1],
        phone: phone.toString(),
        uri: uri,
      });
    }
  };
  useEffect(() => {
    //console.log("route params", route.params);
    updateNewContact();
  }, []);

  const getDataFromLocalStorage = async () => {
    try {
      let previousContacts = await AsyncStorage.getItem("data");
      previousContacts = JSON.parse(previousContacts);
      console.log("previousContacts==", previousContacts);
      return previousContacts;
    } catch (error) {
      console.log("error occured during fetching the data from localstorage");
      return [];
    }
  };
  const handleOnCreateContact = async () => {
    try {
      const previousContacts = await getDataFromLocalStorage();
      //UUID Generation
      const id = uuid.v4();
      console.log("random uuid is", id, "type of uuid", typeof id);

      const newUser = {
        name: newContact.firstname + newContact.lastname,
        phone: newContact.phone,
        uri: newContact.uri,
        id: id,
      };
      console.log("newUser is", newUser);
      console.log("previous_list in handleOnCreateContact", previousContacts);
      let modifiedContacts = [...previousContacts, newUser];
      console.log("modifiedContacts", modifiedContacts);
      await AsyncStorage.setItem("data", JSON.stringify(modifiedContacts));
      showMessage({
        message: "New contact was successfully created",
        type: "info",
      });
      navigation.navigate("contacts");
    } catch (error) {
      console.log("failed to add user", error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      const previousContacts = await getDataFromLocalStorage();
      console.log("previous contacts before delete", previousContacts);
      const newContactsList = previousContacts.filter((user) => {
        return user.id !== id;
      });
      console.log("previous contacts after delete", newContactsList);
      await AsyncStorage.setItem("data", JSON.stringify(newContactsList));
      showMessage({
        message: "contact was deleted successfully",
        type: "info",
      });
      navigation.navigate("contacts");
    } catch (error) {
      console.log("can't delete the user", error);
    }
  };

  const handleOnUpdateContact = async () => {
    try {
      console.log("entered in handleContact function");
      const previousContacts = await getDataFromLocalStorage();
      console.log(
        "list before edit",
        previousContacts,
        "type",
        typeof previousContacts
      );
      /*const userToEdit = previousContacts.filter((user) => {
      return user.id === id;
    });
    console.log("user before update", userToEdit);
    const updatedUser = {
      ...userToEdit,
      name: newContact.firstname + " "+newContact.lastname,
      phone: newContact.phone,
      uri: newContact.uri,
    };
    console.log("updatedUser is", updatedUser);*/

      const updatedList = previousContacts.map((user) => {
        console.log("user.id is", user.id);
        console.log("id=", id);
        if (user.id === id) {
          console.log("user is ************", user);
          (user.name = newContact.firstname + " " + newContact.lastname),
            (user.phone = newContact.phone),
            (user.uri = newContact.uri);
        }
        return user;
      });
      console.log("updated list is ---------------------->", updatedList);
      await AsyncStorage.setItem("data", JSON.stringify(updatedList));
      showMessage({
        message: "contact was updated successfully",
        type: "info",
      });
      navigation.navigate("contacts");
    } catch (error) {
      console.log("can't update the user", error);
    }
  };

  const handleForm = (key, value) => {
    console.log(key, value);
    /*setNewContact((prevData) => {
            return {...prevData, [key]: value}
        });*/
    setNewContact({ ...newContact, [key]: value });
  };
  const handleSubmit = () => {
    //const regex=/(((\+){1}91){1})? ?-?[98765]{1}\d{9}\b$/;
    const regex = /^((\+91)|(0))?( ?\-?)?[6789]\d{9}$/;
    //const regex=/^[789]\d{9}$/;
    console.log("handlesubmit called");
    const error_msg = {};
    if (!newContact.firstname) {
      error_msg.firstname = "Firstname is required";
      console.log("1");
    }
    /*if(!newContact.lastname){
            error_msg.lastname="Lastname is required";
            console.log("2");
        }*/
    if (!newContact.phone) {
      console.log("3");
      error_msg.phone = "Phone number is required";
    }
    if (newContact.phone && !regex.test(newContact.phone)) {
      console.log("4");
      error_msg.phone = "Phone number format is incorrect";
    }

    if (error_msg.firstname || error_msg.phone) {
      setError(error_msg);
      console.log("error", error);
    } else {
      if (isCreateUserInfo) {
        handleOnCreateContact();
      }
      if (isEditUserInfo) {
        handleOnUpdateContact();
      }
    }
  };

  console.log("newContact ", newContact);
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <FontAwesomeIcon icon={faUser} style={{paddingTop:Platform.OS==="android"?30:0}}></FontAwesomeIcon>
        <View style={styles.nameTextContainer}>
          <TextInput
            placeholder="First Name"
            value={newContact.firstname}
            onChangeText={(text) => {
              handleForm(FORM_FIELDS.firstname, text);
            }}
          ></TextInput>
          {error.firstname ? <TextInput>{error.firstname}</TextInput> : ""}
          <TextInput
            placeholder="Last Name"
            value={newContact.lastname}
            onChangeText={(text) => {
              handleForm(FORM_FIELDS.lastname, text);
            }}
          ></TextInput>
          {error.lastname ? <TextInput>{error.lastname}</TextInput> : ""}
        </View>
      </View>
      <View style={styles.phoneContainer}>
        <FontAwesomeIcon icon={faPhone} style={{paddingTop: Platform.OS === 'android' ? 30 : 0}}></FontAwesomeIcon>
        <View style={styles.phoneTextContainer}>
        <TextInput
          placeholder="Phone"
          keyboardType="numeric"
          value={newContact.phone}
          onChangeText={(text) => {
            handleForm(FORM_FIELDS.phone, text);
          }}
        ></TextInput>
        {error.phone ? <TextInput>{error.phone}</TextInput> : ""}
        </View>
      </View>
      <Button
        title={isEditUserInfo ? "Update_contact" : "Create_contact"}
        onPress={handleSubmit} buttonStyle={{backgroundColor:"blue"}}
        color={"grey"}
      ></Button>
      {isEditUserInfo?<View>
      <TouchableOpacity onPress={handleDeleteContact} style={{ margin: 30 }}>
        <FontAwesomeIcon
          icon={faTrash}
          onPress={handleDeleteContact}
        ></FontAwesomeIcon>
      </TouchableOpacity>
      <CallComponent navigation={navigation} route={route} />
      </View>:<Text></Text>}
      <FlashMessage position="bottom"></FlashMessage>
    </View>
  );
}
//      <Button title={"Delete contact"} onPress={handleDeleteContact}></Button>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  nameContainer: {
    flexDirection: "row",
    margin: 10,
  },
  nameTextContainer: {
    marginLeft: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    margin: 10,
  },
  phoneTextContainer:{
    marginLeft:20,
  }
});
