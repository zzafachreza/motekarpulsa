import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = () => {
    getData('user').then(res => {
      axios
        .post('https://motekarpulsa.zavalabs.com/api/absen_izin.php', {
          id_user: res.id,
        })
        .then(x => {
          console.log(x.data);
          setData(x.data);
        });
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 1,
      }}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 30,
            color: colors.secondary,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_lengkap}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.tanggal}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: colors.tertiary,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // flex: 1,
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            {item.tipe}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.secondary,
            }}>
            {item.jam_masuk}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text
            style={{
              fontSize: windowWidth / 35,
              textAlign: 'center',
              color: colors.black,
            }}>
            STATUS
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              type="ionicon"
              name={
                item.status == 'DISETUJUI'
                  ? 'shield-checkmark-outline'
                  : 'mail-unread-outline'
              }
              color={
                item.status == 'DISETUJUI' ? colors.secondary : colors.primary
              }
            />
            <Text
              style={{
                left: 5,
                fontSize: windowWidth / 35,
                textAlign: 'center',
                color:
                  item.status == 'DISETUJUI'
                    ? colors.secondary
                    : colors.primary,
              }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            // flex: 1,
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            {item.jumlah} hari
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.secondary,
            }}>
            {item.jam_pulang}
          </Text>
        </View>
      </View>
      {item.status == 'MENUNGGU PERSETUJUAN' && (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Absen Online',
              'Apakah Anda Yakin Akan Batalkan Pengajuan ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    axios
                      .post(
                        'https://motekarpulsa.zavalabs.com/api/absen_izin_hapus.php',
                        {
                          id_izin: item.id_izin,
                        },
                      )
                      .then(res => {
                        getDataBarang();
                      });
                  },
                },
              ],
            );
          }}
          style={{
            padding: 10,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              color: colors.white,
            }}>
            Batalkan Izin
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      style={{
        padding: 10,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
