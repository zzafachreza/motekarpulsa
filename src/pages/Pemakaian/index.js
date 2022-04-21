import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  YellowBox,
} from 'react-native';
import axios from 'axios';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {
  ScrollView,
  TouchableOpacity,
  Swipeable,
} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {getData} from '../../utils/localStorage';

export default function Pemakaian({navigation, route}) {
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('called');

      getData();
    }
  }, [isFocused]);

  const getData = () => {
    axios
      .post('https://zavalabs.com/sigadisbekasi/api/pemakaian.php')
      .then(res => {
        console.log('detail transaksi', res.data);
        setData(res.data);
      });
  };

  const hanldeHapus = id => {
    axios
      .post(
        'https://zavalabs.com/sigadisbekasi/api/barang_pemakaian_hapus.php',
        {
          id: id,
        },
      )
      .then(res => {
        console.log('detail transaksi', res.data);
        getData();
      });
  };

  return (
    <SafeAreaView
      style={{
        padding: 10,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Laporan')}
          style={{
            backgroundColor: colors.secondary,
            padding: 10,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.white, fontFamily: fonts.secondary[600]}}>
            LAPORAN
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 16,
              color: colors.primary,
            }}>
            Kebutuhan Laundry
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PemakaianTambah');
          }}
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="add" size={22} color={colors.white} />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 16,
              color: colors.white,
            }}>
            Tambah
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map(item => {
          return (
            <Swipeable
              renderRightActions={() => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => hanldeHapus(item.id)}>
                    <View
                      style={{
                        // flex: 1,
                        width: 100,
                        //   backgroundColor: 'blue',
                        // padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        type="ionicon"
                        name="trash"
                        size={40}
                        color={colors.danger}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}>
              <View
                style={{
                  padding: 10,
                  // borderWidth: 1,
                  elevation: 1,
                  marginVertical: 2,
                  // borderColor: colors.primary,
                  backgroundColor: colors.white,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.secondary,
                  }}>
                  {item.tanggal}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{padding: 5}}>
                    <Image
                      resizeMode="contain"
                      source={{uri: item.foto}}
                      style={{width: 100, aspectRatio: 2}}
                    />
                  </View>
                  <View style={{padding: 5, flex: 1}}>
                    <Text style={{fontFamily: fonts.secondary[600]}}>
                      {item.nama_barang}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[400],
                          marginRight: 5,
                        }}>
                        {item.harga} per {item.uom}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[400],
                          color: colors.primary,
                        }}>
                        X
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[400],
                          marginHorizontal: 5,
                        }}>
                        {item.qty}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.primary,
                      }}>
                      {item.keterangan}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 18,
                        color: colors.primary,
                      }}>
                      {item.total}
                    </Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
