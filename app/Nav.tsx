import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const Nav = () => {
  const navigation = useNavigation();

  function goHome() {
    navigation.navigate('Period');
  }

  function goSummery() {
    navigation.navigate('Summery');
  }
  return (
    <View style={styles.main}>


      <TouchableOpacity style={styles.textButton} onPress={goHome}>
        <Text style={{fontFamily:'popping', color:'#FBFBFB', fontWeight: 700, fontSize: 48, marginLeft: 20}}>Tracker</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.imageButton} onPress={goSummery}>
        <Image source={require('../assets/images/summery.png')} style={{width:30, height:30}}/>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

    main: {

      width:'100%',
      height: 80,
      backgroundColor: '#C5BAFF',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },

    imageButton: {
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 110

    },
    textButton: {

      width: 'auto',
      height: 'auto',
    }
});
export default Nav