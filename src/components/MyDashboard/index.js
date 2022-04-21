import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts, windowHeight, windowWidth} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-elements/dist/helpers';

export default function MyDashboard() {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      nama: 'INDIKATOR',
      nav: 'Masuk',
      foto: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
    },
    {
      nama: 'PENILAIAN JALUR',
      nav: 'Keluar',
      foto: 'https://images.unsplash.com/photo-1509395286499-2d94a9e0c814?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
    },
    {
      nama: 'LOKASI',
      nav: 'Masuk',
      foto: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
    },
    {
      nama: 'LAPORAN',
      nav: 'Keluar',
      foto: 'https://images.unsplash.com/photo-1509395286499-2d94a9e0c814?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.nav)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.foto}} />
        <View
          style={{
            top: 0,
            paddingLeft: 10,
            paddingRight: 10,
            position: 'absolute',
            backgroundColor: colors.primary,
            borderBottomRightRadius: 10,
            borderBottomWidth: 5,
            borderBottomColor: colors.secondary,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 23,
            }}>
            {item.nama}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
        }}>
        <View style={{padding: 10}}>
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    height: 150,
    margin: 5,
    width: '100%',
    shadowColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,
    // elevation: 5,
    borderRadius: 5,
    overflow: 'hidden',
    // backgroundColor: colors.success,
    marginBottom: 10,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: 150,
    width: '100%',
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.white,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
