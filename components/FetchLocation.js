import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';

const fetchLocation=props=>{

  return (
    <TouchableOpacity onPress={props.onFetchLocation} style={styles.imgContainer} activeOpacity={0.3} underlayColor='#eee'>
    <Image source={require('../images/icons/locate.png')} style={styles.img} resizeMode={'stretch'}/>
</TouchableOpacity>

  );
};

let Window = Dimensions.get('window');
const styles=StyleSheet.create(
{
  imgContainer:{

    position: 'absolute',
    width: Window.width*0.15,
    height: Window.width*0.15,
    bottom:Window.width*0.015,
    right: Window.width*0.015,
    backfaceVisibility: 'hidden',
  },
    img:{
      width: '100%',
      height: '100%',
    },
  locate:{
    position: 'absolute',
    width: Window.width*0.1,
    height: Window.width*0.1,
    bottom:Window.width*0.01,
    right: Window.width*0.01,
  }
});
export default fetchLocation;
