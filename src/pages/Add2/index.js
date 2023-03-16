import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';

export default function Add2({ navigation, route }) {
    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');
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
                    borderRadius: 10,
                    borderColor: colors.border,
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
                            colorText={colors.white}
                            warna={colors.secondary}
                        />
                    </View>
                </View>
            </View>
        );
    };


    const [data, setData] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const kirim = () => {
        console.error(data);

        setLoading(true);

        axios
            .post('https://motekarpulsa.zavalabs.com/api/1add_transaksi2.php', data)
            .then(x => {
                setLoading(false);

                console.log('respose server', x.data);
                alert('Transaksi Berhasil Di Kirim, silahkan tunggu beberapa saat');
                navigation.replace('MainApp');
            });
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10
        }}>
            <View style={{
                // borderWidth: 1,
                backgroundColor: colors.white,
                borderRadius: 10,
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>Telepon</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14
                }}>{data.no_hp}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <View style={{
                    // borderWidth: 1,
                    backgroundColor: colors.white,
                    flex: 1,
                    marginRight: 5,
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14
                    }}>Jumlah Pulsa</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 20
                    }}> {new Intl.NumberFormat().format(data.pulsa)}</Text>
                </View>

                <View style={{
                    backgroundColor: colors.white,
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14
                    }}>Uang yang diterima</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 20
                    }}>  {new Intl.NumberFormat().format(data.harga)}</Text>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <View style={{
                    backgroundColor: colors.white,
                    flex: 1,
                    marginRight: 5,
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14
                    }}>Bank</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14
                    }}>{data.bank}</Text>
                </View>

                <View style={{
                    backgroundColor: colors.white,
                    flex: 1,
                    marginLeft: 5,
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 14
                    }}>Rekening / Nomor HP</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14
                    }}>{data.rekening}</Text>
                </View>
            </View>


            <View style={{
                backgroundColor: colors.white,
                marginTop: 10,
                borderRadius: 10,
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>Atas Nama</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14
                }}>{data.atas_nama}</Text>
            </View>

            <View style={{
                backgroundColor: colors.white,
                marginTop: 10,
                borderRadius: 10,
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>Transfer Pulsa Ke</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 25,
                    color: colors.primary,
                    textAlign: 'right'
                }}>{data.nomor}</Text>
            </View>
            <UploadFoto
                onPress1={() => getCamera(1)}
                onPress2={() => getGallery(1)}
                label="Upload Foto / Bukti Transfer Pulsa"
                foto={foto}
            />
            <MyGap jarak={10} />
            <MyButton
                onPress={kirim}
                title="SIMPAN TRANSAKSI"
                iconColor={colors.white}
                Icons="create-outline"
                warna={colors.primary}
                colorText={colors.white}
            />
            <MyGap jarak={20} />
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
    )
}

const styles = StyleSheet.create({})