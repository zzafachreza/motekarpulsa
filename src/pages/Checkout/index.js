import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';

export default function Checkout({navigation, route}) {
  const item = route.params;
  const [loading, setLoading] = useState(false);

  const [kirim, setKirim] = useState(item);

  const simpan = () => {
    setLoading(true);
    console.log('kirim ke server', item);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/sigadisbekasi/api/transaksi_add.php', item)
        .then(res => {
          console.log(res);
          Linking.openURL(
            'https://api.whatsapp.com/send?phone=6285252524466&text=' +
              res.data,
          );
          setLoading(false);
        });

      // navigation.replace('MainApp');
      showMessage({
        type: 'success',
        message: 'Transaksi Berhasil, Terima kasih',
      });
    }, 1200);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            {/* data penerima */}

            <View style={{padding: 10}}>
              <MyInput
                label="Nama Penerima"
                iconname="person"
                placeholder="Masukan nama penerima"
                value={kirim.nama_lengkap}
                onChangeText={val =>
                  setKirim({
                    ...kirim,
                    nama_lengkap: val,
                  })
                }
              />
              <MyGap jarak={5} />
              <MyInput
                label="Nomor Handphone"
                iconname="call"
                keyboardType="number-pad"
                placeholder="Masukan nomor telepon"
                value={kirim.nohp}
                onChangeText={val =>
                  setKirim({
                    ...kirim,
                    nohp: val,
                  })
                }
              />
              <MyGap jarak={5} />
              <MyInput
                label="E-Mail"
                iconname="mail"
                placeholder="Masukan alamat email"
                value={kirim.email}
                onChangeText={val =>
                  setKirim({
                    ...kirim,
                    email: val,
                  })
                }
              />
              <MyGap jarak={5} />
              <MyInput
                label="Alamat lengkap"
                iconname="map"
                placeholder="Alamat Lengkap"
                value={kirim.alamat}
                onChangeText={val =>
                  setKirim({
                    ...kirim,
                    alamat: val,
                  })
                }
              />
              <MyGap jarak={5} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: colors.black,
                  fontSize: 16,
                  fontFamily: fonts.secondary[400],
                  padding: 10,
                }}>
                Total Transaksi
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: windowWidth / 15,
                  fontFamily: fonts.secondary[600],
                  padding: 10,
                }}>
                Rp. {new Intl.NumberFormat().format(item.total)}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{padding: 10}}>
          <MyButton
            onPress={simpan}
            title="KIRIM PESANAN"
            warna={colors.success}
            Icons="logo-whatsapp"
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </SafeAreaView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
