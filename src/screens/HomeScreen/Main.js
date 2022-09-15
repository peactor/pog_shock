import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';


export default class MainScreen extends React.Component{
    render(){
        const MetaTraning=()=>{
            this.props.navigation.navigate('Meta')
        }
        const Bicyle=()=>{
            this.props.navigation.navigate('Bicycle')
        }
        const GoMarket=()=>{
            console.log("market")
            this.props.navigation.navigate('Market');
        }

        return (
            
            <ScrollView  scrollEnabled={false} style={styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <View style={styles.headWrapContent}>
                    <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/pogLogo.png')}
                    />
                    <Text style={styles.titletext}> 대한민국 안전 포털 </Text>
                    <View style={styles.iconContainer}>
                    <Icon name="search-outline"    style={styles.titleIcon}/>
                    <Icon name="notifications-outline"    style={styles.titleIcon}/>
                    <Icon name="chatbox-outline"    style={styles.titleIcon}/>
                    </View>
                </View>

                <ImageBackground source={require('../../assets/images/background.png')} style={styles.wrapContentPogbot}>
                    <Image
                        style={styles.pogbotImg}
                        source={require('../../assets/images/pogbot.png')}
                        />

                    <View style={styles.boxWrapper}>
                        <View style={styles.dangerBox}>
                                <View style={styles.dangerNoticeWrapper}>
                                    <View style={styles.textWrapper}>
                                            <Text style={{fontWeight:'bold'}}> 홍길동 님의 </Text>
                                            <Text> 오늘의 {"\n"} 위험지수 </Text>
                                        </View>
                                    <View style={styles.dangerClass}>
                                        <Text style={styles.dangerClassText}> 상 </Text>
                                    </View>
                                </View>         
                                
                                    <TouchableOpacity>
                                        <LinearGradient colors={['#617eff', '#32a8ff']} style={styles.dangerViewButton}>
                                        <Text style={styles.dangerViewButtonText}>
                                            위험요소 보기
                                        </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                        </View>

                        <View style={styles.buyList}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.buyListText}> 구매 리스트 </Text>
                            <TouchableOpacity style={{width:20,height:20,backgroundColor:'white',borderRadius:20, justifyContent: 'center', alignItems:'center'}}> 
                            <IconF
                            name = 'angle-down'
                            style={{color:'#736e60'}}
                            />

                            </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.buyComponent}> 
                                    <Image style={styles.buyComponentImg} source={require('../../assets/images/buylist1.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buyComponent}> 
                                    <Image style={styles.buyComponentImg} source={require('../../assets/images/buylist2.png')} />
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.quickMenu}>
                    <TouchableOpacity style={styles.quickMenuButton}>
                    <Image
                        style={styles.quickMenuButtonImg}
                        source={require('../../assets/images/alarm.png')}
                    />
                    <Text style={styles.quickMenuButtonText}> 사고 접수  </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickMenuButton}
                        onPress={GoMarket}>
                    <Image
                        style={styles.quickMenuButtonImg}
                        source={require('../../assets/images/cart.png')}
                    />
                    <Text style={styles.quickMenuButtonText}> 마켓  </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickMenuButton}
                    onPress={Bicyle}>
                    <Image
                        style={styles.quickMenuButtonImg}
                        source={require('../../assets/images/kickboard.png')}
                    />
                    <Text style={styles.quickMenuButtonText}> 이륜차 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickMenuButton}
                    onPress={MetaTraning}>
                    <Image
                        style={styles.quickMenuButtonImg}
                        source={require('../../assets/images/car.png')}
                    />
                    <Text style={styles.quickMenuButtonText}> Meta {"\n"} Training  </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickMenuButton}>
                    <Image
                        style={styles.quickMenuButtonImg}
                        source={require('../../assets/images/people.png')}
                    />
                    <Text style={styles.quickMenuButtonText}> 원스톱 {"\n"} 사고 처리  </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.fitContainer}>
                    <View style={{flex:1, flexDirection:'row'}} >
                    <Text style={styles.fitContainerTextHeader}> 맞춤형 추천 서비스 </Text>
                    <TouchableOpacity style={{flex:1, paddingRight:wp("5%")}}> 
                        <Text style={styles.fitContainerText}> 더보기 </Text> 
                    </TouchableOpacity>
                    </View>

                    <ScrollView 
                    horizontal={true}
                    alwaysBounceHorizontal={true}
                    alwaysBounceVertical={false}
                    style={{width:wp("100%"),height:hp("30%"),flexDirection:'row'}}>

                    <TouchableOpacity style={styles.fitMenuButton}>
                    <ImageBackground source={require('../../assets/images/bmwitem.jpeg')} style={styles.fitMenuImg}>
                    <Text style={styles.fitMenuText}> BMW {"\n"} item </Text>
                    </ImageBackground>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.fitMenuButton}>
                    <ImageBackground source={require('../../assets/images/safetyitem.jpeg')} style={styles.fitMenuImg}>
                    <Text style={styles.fitMenuText}> 안전용품 {"\n"} 선물하기 </Text>
                    </ImageBackground>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.fitMenuButton}>
                    <ImageBackground source={require('../../assets/images/insurance.png')} style={styles.fitMenuImg}>
                    <Text style={styles.fitMenuText}> 운전자 {"\n"} 보험 </Text>
                    </ImageBackground>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.fitMenuButton}>
                    <ImageBackground source={require('../../assets/images/consulting.jpeg')} style={styles.fitMenuImg}>
                    <Text style={styles.fitMenuText}> 과실 {"\n"} 컨설팅 </Text>
                    </ImageBackground>
                    </TouchableOpacity>

                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:hp("100%"),
        padding: wp('0%'),
        backgroundColor: 'black',
    },

    headWrapContent: {
        marginTop: hp('5%'),
        width: wp('100%'),
        height: hp('10%'),
        // paddingBottom: wp('5%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        flexDirection: "row",
        alignItems: 'center', 
        backgroundColor:'black',
        flex:1
        
    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
    },
    tinyLogo:{
        width: 50,
        height: 20,
        resizeMode: 'stretch',
        marginRight:10,
    },
    titletext:{
     color:'white',
     fontSize:11,
    },
    titleIcon:{
        color:'white',
        fontSize:23,
        marginLeft:10
    },
    iconContainer:{
        flex:1,
        flexDirection: "row",
        justifyContent:'flex-end'
    },
    pogbotImg:{
        width: 180,
        height: 200,
        alignSelf: 'flex-end',
        justifyContent:'flex-start',
        resizeMode:'contain',
    },
    wrapContentPogbot:{
        flex:1,
        width: wp('100%'),
        height: hp('35%'),
        backgroundColor:'black',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'row',
        paddingBottom:hp("2%")
    },
    dangerBox:{
        width:138,
        height:138,
        borderRadius:12,
        backgroundColor:'rgba(255, 255, 2555, 0.7)',
        marginRight:wp('5%'),
        marginTop:hp('5%'),
        alignSelf:'flex-end',
        justifyContent:'center',
        
    },
    textWrapper:{
        alignItems:'flex-start',
        justifyContent:'center'
    },
    dangerViewButton:{
        width:100,
        height:25,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:4
    },
    dangerViewButtonText:{
        color:'white',
        fontSize:12,
        alignSelf:'center',
        justifyContent:'center',
    },
    dangerClass:{
        backgroundColor:'white',
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
    },
    dangerClassText:{
        color:'red',
        fontSize:20,
        fontWeight:'bold'
    },
    dangerNoticeWrapper:{
        flexDirection: "row",
        alignItems:'center',
        marginBottom:15,
        padding:10,
        
    },
    buyList:{
        alignSelf:'flex-end',
        width:180,
        height:hp("15%"),
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'blue',
        marginRight:wp("5%"),
    },
    buyListText:{
        color:'white',
        // marginRight:20,
        fontWeight:'bold',
    },
    buyComponent:{
        width:40,
        height:40,
        backgroundColor:'white',
        borderRadius:40,
        margin:5,

    },
    buyComponentImg:{
        width:40,
        height:40,
        resizeMode:'contain',
    },

    boxWrapper:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-start',
        alignSelf:'center',
        justifyContent:'center',
        // backgroundColor:'red',
    },
    quickMenu:{
        backgroundColor:'white',
        width: wp("85%"),
        height:hp("10%"),
        alignSelf:'center',
        position:'absolute',
        top:hp("48%"),
        borderRadius:10,
        flexDirection:'row',
        zIndex:9999,
        justifyContent:'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 9999,

    },
    quickMenuButton:{
        width:60,
        height:50,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'space-evenly',

    },
    quickMenuButtonImg:{
        width:40,
        height:40,
        resizeMode:'contain',
        // backgroundColor:'red'
    },
    quickMenuButtonText:{
        fontSize:10,
        textAlign:'center',
        color:'#565548'
    },
    fitContainer: {
        flex: 1,
        width: wp("100%"),
        height:hp('50%'),
        backgroundColor: 'white',
        paddingTop:hp("12%"),
        paddingLeft:wp("5%")
    },
    fitContainerTextHeader:{
        fontWeight:'bold',
    },
    fitContainerText:{
        color:'#6d7278',
        alignSelf:'flex-end',
        fontSize:12,
    },
    fitMenuButton:{
        width:hp('12%'),
        height:hp('18%'),
        borderRadius:20,
        overflow:'hidden',
        margin:wp("1%")
    },
    fitMenuImg:{
        flex:1,
        padding:10,
    },
    fitMenuText:{
        color:'white',
    }
    

})