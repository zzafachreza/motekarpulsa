import React, {useEffect, useState} from 'react';
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
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
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
    axios.get('https://zavalabs.com/ekpp/api/jadwal.php').then(res => {
      setData(res.data);
    });
  };

  const renderItem = ({item}) => (
    <>
      <View style={{padding: 10, backgroundColor: colors.secondary}}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.tanggal}
        </Text>
      </View>

      <View
        //   onPress={() => navigation.navigate('Pinjam', item)}
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'white',

          // height: 80,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.nama_jadwal}
          </Text>

          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.border,
              fontFamily: fonts.secondary[400],
            }}>
            {item.keterangan_jadwal}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // flex: 1,
          }}>
          <Icon type="ionicon" name="calendar-outline" color={colors.primary} />
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          Alert.alert('EKPP', 'Anda yakin hapus jadwal  ?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () =>
                axios
                  .post('https://zavalabs.com/ekpp/api/jadwal_delete.php', {
                    id: item.id,
                    qty: item.qty,
                    id_barang: item.id_barang,
                  })
                  .then(res => {
                    console.log(res);
                    getDataBarang();
                  }),
            },
          ]);
        }}
        style={{padding: 10, backgroundColor: '#CDCDCD', marginBottom: 10}}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            textAlign: 'center',
            color: colors.black,
          }}>
          HAPUS JADWAL
        </Text>
      </TouchableOpacity> */}
    </>
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
