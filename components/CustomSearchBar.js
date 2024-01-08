import { TextInput, View } from "react-native";
export default CustomSearchBar = (props) => {
  const { placeholder, Customstyles, searchValue, searchFunc } = props;
  console.log(
    "placeholder,customstyles,searchValue,searchFunc",
    placeholder,
    Customstyles,
    searchValue,
    searchFunc
  );
  console.log("searchValue",searchValue,"typeof searchValue",typeof(searchValue));
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={searchValue}
        onChangeText={(text)=>{searchFunc(text)}}
        style={Customstyles}
      />
    </View>
  );
};
