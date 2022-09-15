
 import React, {
    useState,
    useEffect,
  } from 'react';
  import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Alert,
  } from 'react-native';  

  import Clipboard from '@react-native-clipboard/clipboard';


import RNFS from 'react-native-fs';
function SomethingScreen() {
 const [files, setFiles] = useState([]);
 const [fileData,setFileData] = useState([]);
 const [see,setSee] = useState(false);
 const windowWidth = Dimensions.get('window').width;
 const windowHeight = Dimensions.get('window').height;


  const getFileContent = async (path) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };


  useEffect(() => {
    getFileContent(RNFS.DocumentDirectoryPath); //run the function on the first render.
  }, []);
  //this component will render our list item to the UI


  function replacer(key, value) {
    // Filtering out properties
    console.log(value)
    if(typeof value === String){
      return value.replace(/\0/g, '');
    }
    else{
      return undefined
    }
  }


  const openFile=async(name)=>{
    var filedir = RNFS.DocumentDirectoryPath+'/'+name;
    const response = await RNFS.readFile(filedir,'ascii');
    console.log("1  :", response)
    let a = JSON.stringify(response).replace(/\\u0000/g,'')
    setFileData(a);
    //   console.log("LENGTH : ",test.length)
    //   Clipboard.setString(context);
    //   Alert.alert(context.toString())
    //   console.log("     ", test.join("\n"))

      
    setSee(true) 
  }

  const touchText =()=>{
    setSee(false);
    // console.log(fileData)
    Clipboard.setString(fileData)
    Alert.alert("복사되었습니다",fileData)
}
  

  const Item = ({ name, isFile }) => {
    return (
      <View>
        <Text >Name: {name}</Text>
        <Text> {isFile ? "file" : "folder"}</Text>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
        <TouchableOpacity onPress={()=>openFile(item.name)}>
            <Text > {index}</Text>
            <Item name={item.name} isFile={item.isFile()} />
        </TouchableOpacity>
    );
  };

  // console.log("~~~", fileData)

  return (
    <SafeAreaView>
        <TouchableOpacity onPress={()=>getFileContent(RNFS.DocumentDirectoryPath) }>
                <Text>업데이트</Text>
        </TouchableOpacity>
        {
            see?
            <TouchableOpacity style={{height:windowHeight*0.5, backgroundColor:'white',width:windowWidth}} onPress={()=>{touchText()} }>
            <Text>
              {fileData}
            </Text>
        </TouchableOpacity>
        : null
        }

      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
    }
    


export default SomethingScreen;
