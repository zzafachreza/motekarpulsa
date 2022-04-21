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
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export default function Redeem({navigation, route}) {
  const item = route.params;

  const [jumlah, setJumlah] = useState(1);
  const [user, setUser] = useState({});
  const [point, setPoint] = useState(item.point);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
  }, []);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const addToReddem = () => {
    setLoading(true);
    const kirim = {
      id_member: user.id,
      id_hadiah: item.id,
      jumlah: jumlah,
      point: point,
    };
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/sigadisbekasi/api/redeem_add.php', kirim)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          navigation.replace('Success2', {
            message: 'Berhasil Tambah Keranjang',
          });
          setLoading(false);
        }, 1000);
        // showMessage({
        //   type: 'success',
        //   message: 'Berhasil Melakukan Redeem',
        // });
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
          flex: 1,
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              backgroundColor: colors.primary,
              color: colors.white,
              padding: 5,
            }}>
            Point Anda {new Intl.NumberFormat().format(user.point)}
          </Text>
        </View>
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
                fontSize: windowWidth / 25,
                color: colors.black,
              }}>
              {item.nama}
            </Text>
            <Text
              style={{
                marginVertical: 5,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.primary,
              }}>
              {new Intl.NumberFormat().format(point)} Point
            </Text>
          </View>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.black,
              }}>
              {item.keterangan}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{padding: 10, flex: 1}}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
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
                    if (jumlah == 1) {
                      showMessage({
                        type: 'danger',
                        message: 'Minimal 1 Unit',
                      });
                    } else {
                      setJumlah(jumlah - 1);
                      setPoint(item.point * (jumlah - 1));
                    }
                  }}
                  style={{
                    backgroundColor: colors.secondary,
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
                    if (point > user.point) {
                      showMessage({
                        type: 'danger',
                        message: 'Point Anda Tidak Mencukupi !',
                      });
                    } else {
                      setJumlah(jumlah + 1);
                      setPoint(item.point * (jumlah + 1));
                    }
                  }}
                  style={{
                    backgroundColor: colors.secondary,
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
          </View>
        </View>
      </View>

      {point > user.point ? (
        <View></View>
      ) : (
        <MyButton
          fontWeight="bold"
          radius={0}
          title="REDEEM SEKARANG"
          warna={colors.warning}
          onPress={addToReddem}
        />
      )}

      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
