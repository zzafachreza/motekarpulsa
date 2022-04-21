import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {colors} from '../../utils/colors';
import LottieView from 'lottie-react-native';
import {fonts, windowWidth} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import RenderHtml from 'react-native-render-html';

export default function Search({navigation, route}) {
  const [key, setKey] = useState('');
  const [cari, setCari] = useState(false);
  const [loading, setLoading] = useState(false);

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
        onPress={() => navigation.navigate('Barang', item)}
        activeOpacity={1.0}>
        <View style={{paddingTop: 5, paddingLeft: 5}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 40,

              color: colors.black,
            }}>
            {item.nama_barang}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 70, height: 100}}
            resizeMode="contain"
            source={{uri: gbr}}
          />
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
            }}>
            <View style={styles.detailsContainer}>
              <View
                style={{
                  flex: 1,
                }}>
                {item.tampil_harga == 'YA' && (
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 35,
                      color: colors.warning,
                    }}>
                    Rp. {new Intl.NumberFormat().format(item.harga)}
                  </Text>
                )}
                {item.diskon > 0 && item.tampil_harga == 'YA' ? (
                  <>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: windowWidth / 40,
                          color: colors.border,

                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          textDecorationColor: colors.black,
                        }}>
                        Rp. {new Intl.NumberFormat().format(item.harga_awal)}
                      </Text>
                      <Text
                        style={{
                          left: 5,
                          backgroundColor: colors.warning,
                          borderRadius: 5,
                          color: colors.white,
                          paddingHorizontal: 1,
                          fontSize: windowWidth / 40,
                        }}>
                        {Math.round(100 - (item.harga / item.harga_awal) * 100)}
                        %
                      </Text>
                    </View>
                    <RenderHtml contentWidth={100} source={item.keterangan} />
                  </>
                ) : (
                  <RenderHtml contentWidth={100} source={item.keterangan} />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const pencarian = () => {
    setLoading(true);
    setTimeout(() => {
      setCari(true);
      axios
        .post('https://zavalabs.com/sigadisbekasi/api/barang_cari_key.php', {
          cari: key,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
          // setData(res.data.data);
        });
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            // flex: 1,
            backgroundColor: colors.primary,
            height: 70,
            flexDirection: 'row',

            padding: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="arrow-back" color="#FFF" size={25} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}>
              <TextInput
                value={key}
                onSubmitEditing={pencarian}
                onChangeText={value => setKey(value)}
                selectionColor={'#FFF'}
                autoCapitalize="none"
                autoFocus
                style={{
                  paddingLeft: 20,
                  borderWidth: 1,
                  height: 45,
                  borderRadius: 10,
                  borderColor: '#FFF',
                  color: '#FFF',
                  flexDirection: 'row',
                  fontSize: 18,
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
        {cari && (
          <View
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: '#FFF',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="search"
                color={colors.primary}
                size={16}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: colors.primary,
                  left: 10,
                  fontSize: 16,
                }}>
                Kata Kunci "{key}"
              </Text>
            </View>
            <FlatList
              numColumns={2}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{flex: 1, backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    flex: 0.5,
    marginVertical: 5,
    marginRight: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  detailsContainer: {},
  detailsContainerButton: {
    paddingHorizontal: 5,
  },

  subTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 40,
    color: '#000',
  },
});
