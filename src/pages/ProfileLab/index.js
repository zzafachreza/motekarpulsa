import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';

export default function ProfileLab() {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <Text style={styles.judul}>Lab. Keteknikan Pangaan</Text>
        <Text style={styles.isi}>
          {' '}
          Laboratorium Keteknikan Pengolahan Pangan, Departemen Teknologi
          Industri Pangan, FTIP Unpad ini dikelola oleh Bapak Nandi Sukri,
          S.Pi., M.Si. selaku Kepala Laboratorium dan Ibu Feni Windarningsih,
          S.TP., M.TP. selaku laboran yang mengurus segala bentuk administrasi
          dan penggunaan fasilitas yang ada.
        </Text>
        <Text style={styles.isi}>
          {'  '}Laboratorium Keteknikan Pengolahan Pangan sebagai unsur
          fungsional dari Fakultas Teknologi Industri Pertanian juga memiliki
          struktur organisasi tersendiri. Struktur organisasi dari Laboratorium
          Keteknikan Pengolahan Pangan dibuat oleh Laboran dan disahkan oleh
          Kepala Laboratorium. Laboran memiliki fungsi koordinasi terhadap
          berbagai kegiatan yang berlangsung.
        </Text>
        <Text style={styles.judul}>
          Lokasi Laboratorium Keteknikan Pengolahan Pangan
        </Text>
        <Text style={styles.isi}>
          {'     '}Laboratorium ini terletak di lantai 1 Gedung Departemen
          Teknologi Industri Pangan, FTIP, Unpad. Berikut merupakan foto dari
          kondisi laboratorium keteknikan pengolahan pangan, Departemen
          Teknologi Industri Pangan, FTIP, Unpad.
        </Text>

        <Text style={styles.isi}>(Foto Terlampir)</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 20,
    color: colors.black,
    marginVertical: 10,
  },
  isi: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 25,
    color: colors.black,
    marginTop: 5,
    textAlign: 'justify',
  },
  img: {
    width: windowWidth,
    resizeMode: 'cover',
    height: 250,
    marginVertical: 10,
  },
});
