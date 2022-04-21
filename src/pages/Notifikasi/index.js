import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import {Swipeable} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

export default function ListData() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const __getData = () => {
    getData('user').then(res => {
      setUser(res);
      console.log(res);

      axios
        .post('https://zavalabs.com/sigadisbekasi/api/notifikasi.php', {
          id_member: res.id,
        })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        });
    });
  };

  useEffect(() => {
    __getData();
  }, []);

  const hanldeHapus = id => {
    axios
      .post('https://zavalabs.com/sigadisbekasi/api/notifikasi_hapus.php', {
        id: id,
      })
      .then(res => {
        __getData();
        alert('Berhasil dihapus');
      });
  };

  const MyList = ({judul, keterangan, id}) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback onPress={() => hanldeHapus(id)}>
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
            marginVertical: 5,
            //   borderRadius: 10,
            backgroundColor: colors.white,
            padding: 10,
            elevation: 2,
            //   borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, padding: 10}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 15,
                }}>
                {judul}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: 12,
                }}>
                {keterangan}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        {data.map(item => {
          return (
            <MyList
              id={item.id}
              judul={item.judul}
              keterangan={item.keterangan}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
