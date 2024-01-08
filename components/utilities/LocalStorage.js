import AsyncStorage from "@react-native-async-storage/async-storage";
export const getDataFromLocalStorage = async (key) => {
    try {
      let  previousContacts = await AsyncStorage.getItem(key);
      previousContacts = JSON.parse(previousContacts);
      return previousContacts;
    } catch (error) {
      console.log("error occured during fetching the data from localstorage",error);
      return [];
    }
  };
  export const setDataToLocalStorage=async(key,newList)=>{
    try{
        console.log("newList in setDataToLocalStorage---------",newList);
        await AsyncStorage.setItem(key, JSON.stringify(newList));
    }
    catch(error){
        console.log("error occured while setting the data",error);
    }
  }