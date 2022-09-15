import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView} from 'react-native';
import { createAppContainer } from "react-navigation";
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SampleBox =()=>{
  return(
    <View style={styles.boxContainer}>
    <View style={styles.ProductBox}>
      <Text> sample </Text>
    </View>
    <View style={styles.ProductBox}>
      <Text> sample </Text>
    </View>
    </View>

  )
}

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const DropDown=()=>{
  return(
    <SelectDropdown
    data={countries}
    // defaultValueByIndex={1}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    defaultButtonText={"옵션"}
    buttonTextAfterSelection={(selectedItem, index) => {
      return selectedItem;
    }}
    rowTextForSelection={(item, index) => {
      return item;
    }}
    buttonStyle={styles.dropdown4BtnStyle}
    buttonTextStyle={styles.dropdown4BtnTxtStyle}
    renderDropdownIcon={() => {
      return (
        <FontAwesome name="chevron-down" color={"#d4d2d2"} size={11} />
      );
    }}
    dropdownIconPosition={"right"}
    dropdownStyle={styles.dropdown4DropdownStyle}
    rowStyle={styles.dropdown4RowStyle}
    rowTextStyle={styles.dropdown4RowTxtStyle}
  />
  )
}
export default class MarketScreen extends React.Component{
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
      <Searchbar
        placeholder="검색"
        onChangeText={this.updateSearch}
        value={search}
        // // containerStyle={{backgroundColor: '#f2f2f2'}}
        // // inputStyle={{backgroundColor: '#d6d6d6'}}
        // platform={Platform.OS}
         />
         <DropDown />
         <ScrollView>
          <SampleBox />
          <SampleBox />
          <SampleBox />
          <SampleBox />
          
         </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      height:hp("100%"),
      padding: wp('0%'),
      backgroundColor: 'white',
  },
  boxContainer:{
    width: wp('100%'),
    flexDirection:'row',
    alignContent:"center",
    justifyContent:'center'
  },
  ProductBox:{
    height:wp('45%'),
    width:wp('45%'),
    backgroundColor:'#e8e8e8',
    borderRadius:10,
    margin: wp('2%')
  },
  DropDown:{
    alignSelf:'flex-start',
    backgroundColor:'red'
  },
  dropdown4BtnStyle: {
    width: "25%",
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d4d2d2",
    marginStart:10,
    alignSelf:'flex-end',
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left", fontSize:14 },
  dropdown4DropdownStyle: { backgroundColor: "#EFEFEF", },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
    
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left", },

})