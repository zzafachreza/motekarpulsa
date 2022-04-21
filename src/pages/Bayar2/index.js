import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function Bayar({navigation, route}) {
  const [data, setData] = useState(route.params);

  console.log('data dari bayar', data);
  const [loading, setLoading] = useState(false);
  console.log('pembayaran', data);
  const [foto1, setfoto1] = useState(
    'https://ayokulakan.com/img/no-images.png',
  );

  const options = {
    includeBase64: true,
    quality: 0.5,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const UploadFoto = ({onPress1, onPress2, label, foto}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: foto,
          }}
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.black}
              title="KAMERA"
              warna={colors.border}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };

  const simpan = () => {
    setLoading(true);
    console.log('kirim ke server', data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/sigadisbekasi/api/transaksi_add2.php', data)
        .then(res => {
          console.log(res);
          setLoading(false);
        });

      navigation.replace('MainApp');
      showMessage({
        type: 'success',
        message: 'Transaksi Berhasil, Terima kasih',
      });
    }, 1200);
  };
  return (
    <>
      <SafeAreaView
        style={{
          padding: 10,
          flex: 1,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Total Transaksi
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Rp. {new Intl.NumberFormat().format(route.params.total)}
            </Text>
          </View>
        </View>

        <View>
          <MyButton
            onPress={simpan}
            title="SELESAIKAN TRANSAKSI"
            warna={colors.primary}
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
