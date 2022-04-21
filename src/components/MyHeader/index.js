import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export default function MyHeader() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        height: windowWidth / 5,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        padding: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 2,
            left: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 29,
              maxWidth: '80%',
              color: colors.white,
            }}>
            Data dan Informasi Industri Pariwisata Jawa Barat
          </Text>
        </View>
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/logooren.png')}
            style={{
              width: 621 / 6,
              height: 196 / 6,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
