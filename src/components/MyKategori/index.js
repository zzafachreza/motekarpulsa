import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';

const IconCategory = ({img, title, onPress, iconname}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          // flex: 1,
          width: 90,
          height: 90,

          // backgroundColor: '#F8781D',
          // backgroundColor: '#FFF',
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          // margin: 5,
          // borderWidth: 1,
          // borderColor: colors.secondary,

          // elevation: 2,
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Icon type="ionicon" name={iconname} color={colors.white} size={40} />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              // color: '#F8781D',
              color: colors.white,
              fontSize: 12,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function MyKategori() {
  const navigation = useNavigation();

  const dataKategori = [
    {
      value: 'Pesan',
      icon: 'phone-portrait-outline',
    },
    {
      value: 'Jemput',
      icon: 'file-tray-full-outline',
    },
    {
      value: 'Proses',
      icon: 'layers-outline',
    },
    {
      value: 'Antar',
      icon: 'cube-outline',
    },
  ];

  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 10,
        backgroundColor: colors.primary,

        // backgroundColor: '#FFF',
        paddingBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name="grid" color="#FFF" size={16} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#FFF',
            left: 10,
            fontSize: 16,
          }}>
          KERJA KAMI
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            // backgroundColor: '#16A858',
          }}>
          {dataKategori.map(item => {
            return (
              <IconCategory
                title={item.value}
                iconname={item.icon}
                // onPress={() =>
                //   navigation.navigate('Kategori', {
                //     kategori: item.value,
                //     menu: item.value,
                //   })
                // }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
