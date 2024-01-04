import AsyncStorage from "@react-native-async-storage/async-storage";
export const getDataFromLocalStorage = async () => {
    try {
      let  previousContacts = await AsyncStorage.getItem("data");
      previousContacts = JSON.parse(previousContacts);
      console.log("previousContacts==", previousContacts);
      return previousContacts;
    } catch (error) {
      console.log("error occured during fetching the data from localstorage");
      return [];
    }
  };
  export const setDataToLocalStorage=async(newList)=>{
    try{
        await AsyncStorage.setItem("data", JSON.stringify(newList));
    }
    catch(error){
        console.log("error occured while setting the data",error);
    }
  }