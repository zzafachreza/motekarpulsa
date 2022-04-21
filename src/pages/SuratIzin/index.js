import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
export default function SuratIzin({ navigation }) {
  const [data, setData] = useState({
    tipe: 'SAKIT',
    tanggal: '',
    jumlah: '1',
    ref_member: '',
    keterangan: '',
    foto: '',
    status: 'MENUNGGU PERSETUJUAN',
  });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [TanggalTarget, setTanggalTarget] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // alert(currentDate);

    const Today = new Date(currentDate);
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;
    setData({
      ...data,
      tanggal: today,
    });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const hideMode = currentMode => {
    setShow(false);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const hideDatepicker = () => {
    hideMode('date');
  };

  const options = {
    includeBase64: true,
    quality: 0.5,
    maxWidth: 1000,
    maxHeight: 1000,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = { uri: response.uri };
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto(`data:${response.type};base64, ${response.base64}`);
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
        let source = { uri: response.uri };
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
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
            aspectRatio: 2,
            resizeMode: 'contain',
          }}
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
              colorText={colors.white}
              title="KAMERA"
              warna={colors.primary}
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
              colorText={colors.black}
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const Today = new Date();
    const dd = String(Today.getDate()).padStart(2, '0');
    const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = Today.getFullYear();
    const jam = Today.getHours();
    const menit = Today.getMinutes();
    const detik = Today.getUTCSeconds();
    const today = `${dd}/${mm}/${yyyy}`;
    getData('user').then(res => {
      setData({
        ...data,
        tanggal: today,
        ref_member: res.id,
      });
    });
  }, []);
  //   kirim ke server

  const kirim = () => {
    setLoading(true);

    axios
      .post('https://motekarpulsa.zavalabs.com/api/absen_izin_add.php', data)
      .then(x => {
        setLoading(false);
        alert('Surat Izin Berhasil Di Kirim');
        console.log('respose server', x);
        navigation.navigate('MainApp');
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          padding: 10,
        }}>
        <MyPicker
          onValueChange={x =>
            setData({
              ...data,
              tipe: x,
            })
          }
          iconname="list"
          label="Pilih Tipe Izin"
          data={[
            {
              label: 'SAKIT',
              value: 'SAKIT',
            },
            {
              label: 'IZIN KHUSUS',
              value: 'IZIN KHUSUS',
            },
            {
              label: 'IZIN BIASA',
              value: 'IZIN BIASA',
            },
            {
              label: 'CUTI',
              value: 'CUTI',
            },
          ]}
        />
        <MyGap jarak={5} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            format="YYYY-MM-DD"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <MyInput
          value={data.tanggal}
          onChangeText={x =>
            setData({
              ...data,
              tipe: x,
            })
          }
          label="Pilih Tanggal"
          iconname="calendar-outline"
          onFocus={showDatepicker}
        />

        <MyGap jarak={5} />
        <MyInput
          value={data.jumlah}
          onChangeText={x =>
            setData({
              ...data,
              jumlah: x,
            })
          }
          label="Jumlah Hari"
          iconname="options-outline"
          keyboardType="number-pad"
        />
        <MyGap jarak={5} />
        <MyInput
          value={data.keterangan}
          onChangeText={x =>
            setData({
              ...data,
              keterangan: x,
            })
          }
          multiline
          label="Keterangan / Alasan"
          iconname="chatbox-ellipses-outline"
        />
        <MyGap jarak={5} />

        <UploadFoto
          onPress1={() => getCamera(1)}
          onPress2={() => getGallery(1)}
          label="Upload Foto / Bukti Lainnya"
          foto={foto}
        />
        <MyButton
          onPress={kirim}
          title="SIMPAN SURAT IZIN"
          iconColor={colors.black}
          Icons="mail-outline"
          warna={colors.tertiary}
          colorText={colors.black}
        />
        <MyGap jarak={20} />
      </ScrollView>
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
