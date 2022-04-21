import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowHeight, windowWidth} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Pilihan({navigation, route}) {
  const handleTipe = x => {
    alert('Anda Meilih ' + x);
    storeData('tipe', x);
    navigation.replace('MainApp');
  };
  return (
    <ImageBackground
      source={require('../../assets/back.jpeg')}
      style={{flex: 1, padding: 10, justifyContent: 'space-around'}}>
      <TouchableOpacity
        onPress={() => handleTipe('DINAS LUAR')}
        style={{
          height: windowHeight / 4,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          DINAS LUAR
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTipe('WFO')}
        style={{
          height: windowHeight / 4,
          backgroundColor: colors.success,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 18,
            color: colors.white,
          }}>
          WFO ( WORK FROM OFFICE )
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTipe('WFH')}
        style={{
          height: windowHeight / 4,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 18,
            color: colors.black,
          }}>
          WFH ( WORK FROM HOME )
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
