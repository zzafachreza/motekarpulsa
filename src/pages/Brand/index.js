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

import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts, windowHeight, windowWidth} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-elements/dist/helpers';

export default function Brand({navigation, route}) {
  const item = route.params;

  useEffect(() => {
    axios
      .post('https://zavalabs.com/sigadisbekasi/api/brand.php', {
        kategori: item.nama,
      })
      .then(res => {
        console.log('data brand', res.data);
        setData(res.data);
        // setData(res.data.data);
      });
  }, []);

  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Search2', item)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.foto}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Image source={{uri: item.foto}} style={{height: 120}} />
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.danger,
  },
  card: {
    margin: 5,
    height: 100,
    width: '50%',
    justifyContent: 'center',
    flex: 0.5,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 2,
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
