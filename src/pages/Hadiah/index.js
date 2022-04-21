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
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Hadiah() {
  useEffect(() => {
    axios.get('https://zavalabs.com/sigadisbekasi/api/hadiah.php').then(res => {
      console.log(res.data);
      setData(res.data);
      // setData(res.data.data);
    });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    let gbr = '';

    if (item.tampil_gambar == 'YA') {
      gbr = item.foto;
    } else {
      gbr = 'https://zavalabs.com/nogambar.jpg';
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Redeem', item)}
        activeOpacity={1.0}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          {item.tampil_point == 'YA' && (
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 20,
                padding: 3,
                backgroundColor: colors.primary,
                borderBottomLeftRadius: 10,
                paddingHorizontal: 20,
                color: colors.white,
              }}>
              {item.point} Point
            </Text>
          )}
        </View>
        <Image style={styles.image} source={{uri: gbr}} />

        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.title}>{item.nama}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{padding: 10}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'contain',
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
    color: colors.black,
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
