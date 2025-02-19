import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import Nav from './Nav';
import Period from './Period'

const index = () => {

    const [fontLoaded] = useFonts({

        popping : require('../assets/fonts/Poppins-Regular.ttf')

    });

    if (!fontLoaded) {

        return null;
    }

  return (
    <View>
      <Period/>
    </View>
  )
}

export default index