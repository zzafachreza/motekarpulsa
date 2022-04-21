import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {FlatList} from 'react-native';

export default function Wa() {
  const [wa, setWa] = useState({});

  useEffect(() => {
    axios.get('https://zavalabs.com/sigadisbekasi/api/wa.php').then(res => {
      setWa(res.data);
      console.log('data', res.data);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
          }}>
          Nomor Kontak Kami
        </Text>
      </View>
      <FlatList
        data={wa}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                Linking.openURL(
                  'https://api.whatsapp.com/send/?phone=' + item.no_wa,
                )
              }>
              <View style={{flex: 1}}>
                <Text style={styles.txt}>{item.nama_wa}</Text>
                <Text style={styles.txt}>{item.no_wa}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}>
                <Icon
                  color={colors.success}
                  type="ionicon"
                  name="logo-whatsapp"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <View style={{justifyContent:'center',alignItems:'center',paddingBottom:40,flex:1}}>
            <Image source={require('../../assets/logo.png')} style={{width:200,resizeMode:'contain'}} />
            </View> */}

      {/* <TouchableOpacity style={styles.btn} onPress={()=> Linking.openURL(
                    'https://api.whatsapp.com/send/?phone='+company.tlp,
                  )  }>
                <View style={{flex:1}}>
                    <Text style={styles.txt}>WhatsApp 1</Text>
                    <Text style={styles.txt}>{company.tlp}</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',paddingRight:20,}}>
                    <Icon color={colors.white} type="ionicon" name="logo-whatsapp"  size={30}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=> Linking.openURL(
                    'https://api.whatsapp.com/send/?phone='+company.tlp2,
                  )  }>
                 <View style={{flex:1}}>
                    <Text style={styles.txt}>WhatsApp 2</Text>
                    <Text style={styles.txt}>{company.tlp2}</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',paddingRight:20,}}>
                    <Icon color={colors.white} type="ionicon" name="logo-whatsapp"  size={30}/>
                </View>
            </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 100,
    backgroundColor: colors.white,
    flexDirection: 'row',
    elevation: 2,
  },
  txt: {
    color: colors.black,
    fontSize: windowWidth / 20,
  },
});
