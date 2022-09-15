/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

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
  Dimensions
} from 'react-native';  

import BleManager from './BleManager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const serviceUUID = '8b017e97-0c06-4a3b-958a-6ac699a09d5a';
const characteristicUUID = '31554952-8d0f-41e6-aa91-887141e287fe';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const [periID, setPeriID] = useState('');
  const [roadType, setRoad] = useState('');
  const [BleData, setData] = useState([]);
  const [seeList, setSeeList] = useState(false);
  const [notifyState, setNotifyState] = useState(0);
  const [Direction, setDirection] = useState('');
  const RNFS = require('react-native-fs');
  const [savingData, saveData] = useState("");
  const [savingDataList, saveDataList] = useState("");

  const [saving, setSaving] = useState(false);
  const [fileName, setFilename] = useState('');





  const startScan = () => {
    setSeeList(!seeList);
    if (!isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  }

  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = async(data) => {

    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    let val = parseInt(data.value[0]);
    console.log("VAL  : ",val)
    await readData(val,data.peripheral);
    setNotifyState(val);


  }

  const retrieveConnected = () => {
    setSeeList(true);
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

  const handleDiscoverPeripheral = (peripheral) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  }

  const testPeripheral = (peripheral) => {
    setSeeList(false);
    if (peripheral){
      if (peripheral.connected){
        console.log("THIS IS ID:  : ",peripheral.id)
        BleManager.disconnect(peripheral.id);
      }else{
        console.log("P  : ",peripheral);
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);
          setPeriID(peripheral.id);

          setTimeout(() => {
            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData.characteristics);
          
              // let serviceUUID = '8b017e97-0c06-4a3b-958a-6ac699a09d5a';
              // let characteristicUUID = '31554952-8d0f-41e6-aa91-887141e287fe';
              let serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
              let characteristicUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
              BleManager.startNotification(
                peripheral.id,
                serviceUUID,
                characteristicUUID,
            )
              .then(() => {
                // Success code
                console.log("Notification started");
              })
              .catch((error) => {
                // Failure code
                console.log("error in test peripheral : ",error);
              });

            });
          }, 10);
        }).catch((error) => {
          console.log('Connection error', error);
        });
    }
  
    }}

  const saveasFile = (filename) =>{
    var path = RNFS.DocumentDirectoryPath + '/'+filename+'.txt';
    console.log(path)
    RNFS.writeFile(path, savingData, 'ascii')
    .then((success) => {
      console.log('FILE WRITTEN!');
      // saveData([]);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  const addData = (filename,data) =>{
    var path = RNFS.DocumentDirectoryPath + '/'+filename+'.txt';
    console.log("DATA===========================  ",data)
    RNFS.appendFile(path, data, 'ascii')
    .then((success) => {
      console.log('==============================================data updated!');
      saveData('');
    })
    .catch((err) => {
      console.log("=============================================",err.message);
    });
  }


  const startSaving=()=>{
    setSaving(!saving);
    var filename = new Date().toJSON().replace(/[-T:]/g,'_');

    setFilename(filename)
    if(saving){
        saveasFile(filename)
    }
  }

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }  
    
    return (() => {
      console.log('unmount');
      bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
      bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }, []);

  const renderItem = (item) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={{backgroundColor: color}}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  const readData = async (val,peripheralID)=>{
      BleManager.read(
        peripheralID,
        serviceUUID,
        characteristicUUID,
      )
        .then(async (result) => {

    // if(saving){

      console.log("                                                                                             "+result.substring(3,result.length)+',');
      saveData(Date().toLocaleString()+"  :   "+result.substring(3,result.length)+' \n ');
      console.log("                                                                                             "+savingData);
  // }
          // if(val == 2 || val == 3){
            const words = result.split(' ');
            console.log(words)
            let angle = parseInt(words[6]);
            console.log("Angle  :   ", angle)
            if(angle>15){
                setRoad('오르막길');
            }else if(angle<-15){
                setRoad('내리막길');
            }else{
                setRoad('');
            }
            setData(words)
          // }

        })
        .catch(error => {
          console.log(error);
        });
    
  }
  
  const getData = () =>{
    let axis = BleData[0];
    let axisnum = axis? parseInt(axis.slice(2,7)) : 0;
    console.log("+++++++++++++++++++", axisnum)
    return(
        <View style={{backgroundColor:'white',paddingLeft:20,paddingTop:40,paddingBottom:50}}>
            <Text >
            <Text style={styles.dataTextSmall}> X축 충격량  :   </Text>
            <Text style={styles.dataText}>{BleData[3]}</Text>
            </Text>
            <Text >
            <Text style={styles.dataTextSmall}> Y축 충격량  :   </Text>
            <Text style={styles.dataText}>{BleData[4]}</Text>
            </Text>
            <Text >
            <Text style={styles.dataTextSmall}> Z축 충격량  :   </Text>
            <Text style={styles.dataText}>{BleData[5]}</Text>
            </Text>
            <Text>
            <Text style={styles.dataTextSmall}> 각도  :   </Text>
            {
              BleData[2]>1000 ?
              <Text style={styles.dataText}>{Math.abs(90-BleData[6])}  오르막길 </Text>
              : BleData[2]<-1000 ? <Text style={styles.dataText}>{Math.abs(90-BleData[6])}  내리막길 </Text>
              : <Text style={styles.dataText}>{BleData[6]}   </Text>
            }
            </Text>
            
            <Text>
            <Text style={styles.dataTextSmall}> 전도방향  :   </Text>
            { 
              // val==2? 
              axisnum<-2000?
              <Text style={styles.dataText}> 왼쪽 </Text>
              : axisnum>2000? <Text style={styles.dataText}>  오른쪽 </Text>
              : <Text style={styles.dataText}>   </Text>
              
            }
            </Text>
            


        <Text style={styles.dataTextSmall}> 현재 시간 :  {Date().toLocaleString()}</Text>
            
        </View>

    )
  }

  if(saving){
    console.log(savingData);
    addData(fileName,savingData)
  }
  return (
    <>

      <SafeAreaView style={{backgroundColor:saving?'red':'white',flex:1}}>
        {
        seeList? null :   getData()
        }

            <View style={{margin: 10}}>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={() => startScan() } >         
                      <Text
                      style={styles.buttonsText}>
                      블루투스 스캔하기 {isScanning ? 'on' : 'off'}
                    </Text>   
                    </TouchableOpacity>
            </View>

            <View style={{margin: 10}}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => retrieveConnected() } >         
                <Text
                style={styles.buttonsText}>
                연결된 장치 제거
              </Text>   
              </TouchableOpacity>
            </View>

            <View style={{margin: 10}}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => startSaving() } >         
                <Text
                style={styles.buttonsText}>
                  데이터 저장
              </Text>   
              </TouchableOpacity>
            </View>


            {
                seeList?
                  <ScrollView
                  // contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>

                  {global.HermesInternal == null ? null : (
                  <View style={styles.engine}>
                      <Text style={styles.footer}>Engine: Hermes</Text>
                  </View>
                  )}
                  <View style={{backgroundColor:'white'}}>
                  
              
                  {(list.length == 0) &&
                      <View style={{flex:1, margin: 20}}>
                      <Text style={{textAlign: 'center'}}>연결된 장치가 없습니다 </Text>
                      </View>
                  }
                  
                  </View>   

              <FlatList
                  data={list}
                  renderItem={({ item }) => renderItem(item) }
                  keyExtractor={item => item.id}
                  />        
              </ScrollView>
              :null

            }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
      height:windowHeight*0.8,
      backgroundColor:'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  scanButton: {
      color:"#f194ff",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  //   color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  //   color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
  //   color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttons: {
      marginRight: 20,
      marginLeft: 20,
      marginTop: 0,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#1248cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
    },
    buttonsText: {
      color: '#fff',
      textAlign: 'center',
    },

    dataText:{
        color:'black',
        fontSize:40,
        fontWeight:'bold',
    },
    dataTextSmall:{
      color:'black',
      fontSize:18,
  },
});

export default App;