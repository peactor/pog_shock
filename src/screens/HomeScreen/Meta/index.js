import React from 'react';
import {Button, Dimensions, Platform, View} from 'react-native';
import UnityView, {
  UnityModule,
  UnityResponderView,
} from 'react-native-unity-play';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

class Unity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
    };

    this.initComponent = () => {
      if (Platform.OS === 'android') {
        UnityModule.resume();
      }
    };
  }

  componentDidMount() {
    this.initComponent();
  }

  render() {
    const {isVisible} = this.state;
    let unityElement;

    if (Platform.OS === 'android') {
      unityElement = (
        <UnityView style={{width: wp('100%'), height:hp('100%'), zIndex: 9999}} />
      );
    } else {
      unityElement = (
        <UnityResponderView
          fullScreen={true}
          style={{width: width, height: height}}
        />
      );
    }

    return (
      <View>
        {/* {!isVisible && (
          <Button
            title={props.name}
            onPress={() => {
              this.setState({isVisible: true});
            }}
          />
        )} */}
        {isVisible && (
          <View>
            {unityElement}
            <View
              style={{
                position: 'absolute',
                top: 45,
                left: 20,
                zIndex: 9999,
              }}>
              <Button
                title={'Close'}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    UnityModule.quit();
                  }
                  this.setState({isVisible: false});
                }}
                style={{color: '#fff'}}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Unity;