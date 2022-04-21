import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Tambah({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama: null,
    tc: null,
    ta: null,
    r: null,
    v: null,
  });

  const simpan = () => {
    setLoading(true);
    console.log(data);
    axios.post('https://zavalabs.com/api/beton_add.php', data).then(res => {
      console.log(res);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Success2', {
          messege: 'Data berhasil ditambah',
        });
        setData({
          nama: null,
          tc: null,
          ta: null,
          r: null,
          v: null,
        });
      }, 1000);
    });
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        padding: 10,
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.secondary[600],
            }}>
            Perhitungan Retak Susut
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.secondary[400],
            }}>
            (Plastic Shrinkage Cracking)
          </Text>
        </View>

        <MyGap jarak={10} />
        <MyInput
          label="Masukan temperatur udara (Celcius)"
          keyboardType="decimal-pad"
          iconname="thermometer"
          value={data.tc}
          onChangeText={value =>
            setData({
              ...data,
              tc: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Masukan temperatur beton segar (Celcius)"
          keyboardType="decimal-pad"
          iconname="thermometer-outline"
          value={data.ta}
          onChangeText={value =>
            setData({
              ...data,
              ta: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Masukan kelembaban relatif (%)"
          keyboardType="decimal-pad"
          iconname="cloudy-outline"
          value={data.r}
          onChangeText={value =>
            setData({
              ...data,
              r: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Masukan kecepatan angin (km per jam/kph)"
          keyboardType="decimal-pad"
          iconname="pulse"
          value={data.v}
          onChangeText={value =>
            setData({
              ...data,
              v: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Keterangan"
          label2="(Masukan keterangan cuaca hujan/kering, kondisi pekerja , dll)"
          iconname="newspaper-outline"
          value={data.nama}
          onChangeText={value =>
            setData({
              ...data,
              nama: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyButton
          warna={colors.secondary}
          title="SIMPAN DATA"
          Icons="log-in"
          onPress={simpan}
        />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
