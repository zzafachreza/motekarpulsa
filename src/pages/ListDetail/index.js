import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function ListDetail({ navigation, route }) {
  const item = route.params;
  navigation.setOptions({ title: item.kode });
  const [data, setData] = useState({});
  const [buka, setBuka] = useState(false);

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);
      DataDetail();

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'motekarpulsa', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    DataDetail();
    return unsubscribe;
  }, []);
  let nama_icon = '';

  if (data.status_transaksi == "DONE") {
    nama_icon = 'checkmark-circle-outline';
  } else {
    nama_icon = 'close-circle-outline';
  }


  const DataDetail = () => {
    axios
      .post('https://motekarpulsa.zavalabs.com/api/transaksi_detail.php', {
        id_transaksi: item.id,
      })
      .then(res => {
        console.log('detail transaksi', res.data);
        setData(res.data);
        setBuka(true);
      });
  }
  const DataPesanan = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
        }}>

        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.primary,
            padding: 10,
            color: colors.white,
          }}>
          {item.kode} - {item.tanggal}
        </Text>
        {/* --- */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Nama
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.nama_lengkap}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              No Hp
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.no_hp}
            </Text>
          </View>
        </View>
        {/* ---- */}
        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Email
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.email}
            </Text>
          </View>
        </View>
        {/* ---- */}
      </View>
    );
  };


  const DataTransaksi = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
        }}>

        {/* --- */}
        <Image source={{
          uri: 'https://motekarpulsa.zavalabs.com/' + data.foto_asset
        }} style={{
          resizeMode: 'contain',
          height: 50
        }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Provider
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.nama_asset}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Rate
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.rate}
            </Text>
          </View>
        </View>
        {/* ---- */}
        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Pulsa
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {new Intl.NumberFormat().format(item.pulsa)}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Uang
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {new Intl.NumberFormat().format(item.harga)}
            </Text>
          </View>
        </View>
        {/* ---- */}{/* --- */}
        <Image source={{
          uri: data.bank_image
        }} style={{
          resizeMode: 'contain',
          height: 50
        }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Bank
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.bank}
            </Text>
          </View>
        </View>
        {/* ---- */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Rekening / No. HP
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.rekening}
            </Text>
          </View>
        </View>
        {/* ---- */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Atas Nama
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {item.atas_nama}
            </Text>
          </View>
        </View>
        {/* ---- */}
        {/* ---- */}
        <View style={{ flexDirection: 'row', backgroundColor: '#DEDEDE' }}>
          <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,
                fontSize: 14
              }}>
              Transfer Pulsa Ke
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 15,
                padding: 10,
                color: colors.danger,
              }}>
              {item.nomor_asset}
            </Text>
          </View>
        </View >
        {/* ---- */}
      </View >
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {!buka && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}
      {buka && <>
        <ScrollView style={{ padding: 10, flex: 1 }}>
          <DataPesanan />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: '#DEDEDE',
              padding: 10,
              color: colors.black,
            }}>
            TRANSAKSI
          </Text>
          <DataTransaksi />

        </ScrollView>
        <View
          style={{

            backgroundColor: data.status_transaksi == "DONE" ? colors.success : colors.danger,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
          <Icon type='ionicon' name={nama_icon} color={colors.white} size={windowWidth / 20} />
          <Text style={{
            left: 5,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white
          }}>
            {data.status_transaksi}
          </Text>
        </View></>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
