import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default function Pinjam({navigation, route}) {
  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const isFocused = useIsFocused();

  const [jumlah, setJumlah] = useState(1);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(0);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
      });
      getData('cart').then(res => {
        console.log(res);
        setCart(res);
      });
    }
  }, [isFocused]);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const addToCart = () => {
    const kirim = {
      id_member: user.id,
      id_barang: item.id,
      nama_barang: item.nama_barang,
      qty: jumlah,
    };
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/ekpp/api/barang_add.php', kirim)
      .then(res => {
        console.log(res);

        showMessage({
          type: 'success',
          message: 'Berhasil Melakukan Pinjaman',
        });
        navigation.replace('MainApp');
        modalizeRef.current.close();
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          height: 50,
          // padding: 10,
          paddingRight: 10,
          backgroundColor: colors.primary,

          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="arrow-back" color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
            }}>
            {item.nama_barang}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          source={{
            uri: item.foto,
          }}
        />
        <View style={{padding: 10}}>
          {item.stok > 0 && (
            <Text
              style={{
                alignSelf: 'flex-end',
                textAlign: 'center',
                backgroundColor: colors.secondary,
                borderRadius: 5,
                color: colors.white,
                padding: 10,
                width: 120,
                fontFamily: fonts.secondary[600],
              }}>
              {item.stok} Available
            </Text>
          )}

          {item.stok == 0 && (
            <Text
              style={{
                alignSelf: 'flex-end',
                textAlign: 'center',
                backgroundColor: colors.secondary,
                borderRadius: 5,
                color: colors.white,
                padding: 10,
                width: 120,
                fontFamily: fonts.secondary[600],
              }}>
              Kosong
            </Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.primary,
              }}>
              {item.nama_barang}
            </Text>
          </View>
        </View>
      </View>
      {item.stok > 0 && (
        <MyButton
          Icons="book"
          fontWeight="bold"
          radius={0}
          title="PINJAM ALAT DAN BAHAN"
          warna={colors.primary}
          onPress={onOpen}
        />
      )}

      {item.stok == 0 && (
        <MyButton
          fontWeight="bold"
          radius={0}
          title="MAAF TIDAK BISA PINJAM"
          warna={colors.border}
        />
      )}
      <Modalize
        withHandle={false}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={275}
        HeaderComponent={
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 100,
                    borderRadius: 20,
                    aspectRatio: 1,
                  }}
                  source={{uri: item.foto}}
                />
              </View>
              <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.primary,
                  }}>
                  {item.nama_barang}
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <View style={{flex: 1, height: windowWidth / 2}}>
          <View style={{padding: 10, flex: 1}}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Jumlah
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    jumlah == 1
                      ? showMessage({
                          type: 'danger',
                          message: 'Minimal pembelian 1 Pcs',
                        })
                      : setJumlah(jumlah - 1);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    width: '30%',
                    borderRadius: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Icon type="ionicon" name="remove" color={colors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
                    {jumlah}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    jumlah >= item.stok
                      ? showMessage({
                          type: 'danger',
                          message: 'Pembelian melebihi batas !',
                        })
                      : setJumlah(jumlah + 1);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    width: '30%',
                    borderRadius: 10,
                    marginLeft: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon type="ionicon" name="add" color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* <MyButton
              radius={20}
              fontWeight="bold"
              radius={0}
              title="TAMBAH KERANJANG"
              warna={colors.primary}
              onPress={addToCart}
            /> */}
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                onPress={addToCart}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 22,
                    color: colors.white,
                  }}>
                  PINJAM ALAT DAN BAHAN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
