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
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';

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
    axios.get('https://zavalabs.com/ekpp/api/barang.php').then(res => {
      setData(res.data);
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item.stok > 0) {
          navigation.navigate('Pinjam', item);
        } else {
          alert('Maaf tidak bisa pinjam !');
        }
      }}
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 1,

        // height: 80,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}>
        {item.stok > 0 && (
          <Text
            style={{
              fontSize: windowWidth / 35,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            KLIK UNTUK PINJAM ALAT & BAHAN
          </Text>
        )}
        <Image
          source={{uri: item.foto}}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
        />
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_barang}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',

          flex: 1,
        }}>
        {item.stok > 0 && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Medium',
                color: colors.black,
              }}>
              {item.stok}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: colors.secondary,
              }}>
              Stock Available
            </Text>
          </>
        )}
        {item.stok == 0 && (
          <>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Out of Stock
            </Text>
          </>
        )}
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
