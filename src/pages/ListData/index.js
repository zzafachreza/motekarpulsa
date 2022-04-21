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
} from 'react-native';
import { storeData, getData } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

import 'intl';
import 'intl/locale-data/jsonp/en';
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
        .post('https://motekarpulsa.zavalabs.com/api/transaksi.php', {
          fid_user: res.id,
        })
        .then(x => {
          console.log(x.data);
          setData(x.data);
        });
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListDetail', item)}
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
            color: colors.primary,
            fontFamily: fonts.secondary[600],
          }}>
          {item.kode}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.tanggal}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.white,
            paddingHorizontal: 10,
            backgroundColor: item.status_transaksi == "OPEN" ? colors.danger : colors.success,
            fontFamily: fonts.secondary[600],
          }}>
          {item.status_transaksi}
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
            {item.nama_asset}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              color: colors.primary,
            }}>
            {item.rate}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              paddingHorizontal: 10,
            }}>
            PULSA
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 25,
              fontFamily: fonts.secondary[600],
              textAlign: 'center',
              color: colors.black,
            }}>

            {new Intl.NumberFormat().format(item.pulsa)}
          </Text>
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
              color: colors.primary,
              paddingHorizontal: 10,
            }}>
            UANG DITERIMA
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 25,
              fontFamily: fonts.secondary[600],
              textAlign: 'center',
              color: colors.secondary,
            }}>
            {new Intl.NumberFormat().format(item.harga)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
