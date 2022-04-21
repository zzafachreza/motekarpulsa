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

export default function MyTerbaik3() {

  const [band,setBand] = useState('');
 
  useEffect(() => {
    axios
    .post('https://zavalabs.com/wandhaelektronik/api/slider2.php',{
      key:'BATAS AKSESORIS'
    })    .then(res => {
      console.log(res.data.foto);
      setBand(res.data.foto);
      // setData(res.data.data);
    });
    axios
      .get('https://zavalabs.com/wandhaelektronik/api/brand3.php')
      .then(res => {
        console.log(res.data);
        setData(res.data);
        // setData(res.data.data);
      });
  }, []);

  const navigation = useNavigation();
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
    <View>
      <View
        style={{
          flex: 1,
          // padding: 10,
          backgroundColor: '#FFF',
        }}>
        <Image
          resizeMode="stretch"
          source={{uri:'https://zavalabs.com/wandhaelektronik/'+band}}
  
          style={{
            width: windowWidth,
            height: windowWidth / 1.7,
          }}
        />
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
    height: 100,
    width: '50%',
    margin: '1%',
    shadowColor: colors.primary,
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
    backgroundColor: colors.primary,
    marginBottom: 10,
    justifyContent: 'center',
    flex: 0.5,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    resizeMode: 'center',
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
