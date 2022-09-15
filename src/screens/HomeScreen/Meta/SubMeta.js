import React from 'react';
import { Text, View, Button } from 'react-native';
import Unity from '../../../../Unity';

export default class SubMeta extends React.Component{ 
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

  }

  render(){

  // fullScreen=()=>{
  //   this.setState({isVisible: true})
  // }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
          {this.state.isVisible?
        <Unity name={'case1'}/>:
        <Button
        title={'class1'}
        onPress={() => {
          this.setState({isVisible: true});
        }}
      />
          }
      </View>
    )
  }
}
