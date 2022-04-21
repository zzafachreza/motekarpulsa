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
import {fonts} from '../../utils/fonts';
import {MyButton, MyGap, MyInput} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-reanimated';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function BarangPemakaian({navigation, route}) {
  const item = route.params;
  // console.log('detail pembantu', item);
  navigation.setOptions({title: 'Detail Kebutuhan'});

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = Today.getHours();
  const menit = Today.getMinutes();
  const detik = Today.getUTCSeconds();
  const today = `${yyyy}-${mm}-${dd}`;

  const [jumlah, setJumlah] = useState(1);
  const [ukuran, setUkuran] = useState('S');
  const [user, setUser] = useState({});
  const [tanggal, setTanggal] = useState(today);
  const [keterangan, setKeterangan] = useState('');
  const [qty, setQty] = useState('1');

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
  }, []);

  const MyListData = ({label, value}) => {
    return (
      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          paddingBottom: 5,
          borderBottomColor: colors.primary,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.secondary,
            }}>
            {label}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: 12,
            color: colors.black,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  const modalizeRef = useRef();

  const onOpen = () => {
    const kirim = {
      tanggal: tanggal,
      id_barang: item.id,
      harga: item.harga,
      qty: qty,
      total: qty * item.harga,
      keterangan: keterangan,
    };
    console.log('kirim tok server', kirim);
    axios
      .post(
        'https://zavalabs.com/sigadisbekasi/api/barang_pemakaian_add.php',
        kirim,
      )
      .then(res => {
        console.log(res);
        navigation.navigate('Pemakaian', {
          status: 'success',
        });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          //   flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '50%',
            aspectRatio: 1,
          }}
          source={{
            uri: item.foto,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',

          backgroundColor: colors.primary,
          // padding: 20,
          paddingTop: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              color: colors.white,
            }}>
            {' '}
            {item.nama_barang}
          </Text>
        </View>

        <ScrollView
          style={{backgroundColor: colors.white, padding: 10, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="bookmark-outline"
                  type="ionicon"
                  size={14}
                  color={colors.primary}
                />
                <Text
                  style={{
                    left: 5,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                  }}>
                  Deskripsi Kebutuhan
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: 20,
                  color: colors.black,
                }}>
                {item.keterangan}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 25,
                color: colors.secondary,
              }}>
              Rp. {new Intl.NumberFormat().format(item.harga)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              marginVertical: 10,

              backgroundColor: colors.secondary,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="calendar-outline"
                type="ionicon"
                size={14}
                color={colors.white}
              />
              <Text
                style={{
                  left: 5,
                  fontFamily: fonts.secondary[600],
                  color: colors.white,
                  fontSize: 14,
                }}>
                Pilih Tanggal Transaksi
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                color: colors.white,
              }}>
              {tanggal}
            </Text>
          </TouchableOpacity>
          <MyInput
            label="Jumlah"
            keyboardType="number-pad"
            iconname="cube-outline"
            value={qty}
            onChangeText={val => {
              setQty(val);
            }}
          />
          <MyGap jarak={10} />
          <MyInput
            label="Keterangan"
            iconname="book-outline"
            value={keterangan}
            onChangeText={val => {
              setKeterangan(val);
            }}
          />
          <MyGap jarak={10} />
          <MyButton
            fontWeight="bold"
            radius={10}
            title="SIMPAN TRANSAKSI"
            warna={colors.primary}
            onPress={onOpen}
          />
        </ScrollView>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: colors.white}}>
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  type="ionicon"
                  name="close-outline"
                  size={35}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={day => {
                setTanggal(day.dateString);
                setModalVisible(false);
              }}
              markedDates={{
                [tanggal]: {
                  selected: true,
                  selectedColor: colors.primary,
                },
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: colors.secondary,
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: colors.primary,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: colors.primary,
                indicatorColor: colors.primary,
                textDayFontFamily: fonts.secondary[400],
                textMonthFontFamily: fonts.secondary[400],
                textDayHeaderFontFamily: fonts.secondary[400],
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
