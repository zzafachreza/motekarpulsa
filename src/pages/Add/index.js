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

export default function ({ navigation, route }) {

    const item = route.params;
    console.error(item);
    const [data, setData] = useState({
        fid_asset: item.id,
        rate: item.harga_asset,
        nomor: item.nomor_asset,
        pulsa: 0,
        harga: 0,
        fid_user: 0,
        keterangan: '',
        foto: '',
    });
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
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
                            colorText={colors.white}
                            warna={colors.secondary}
                        />
                    </View>
                </View>
            </View>
        );
    };

    useEffect(() => {

        axios.get('https://zavalabs.com/metode-bayar').then(res => {
            setBank(res.data);
        })

        getData('user').then(res => {
            setData({
                ...data,
                fid_user: res.id,
                no_hp: res.telepon
            });
        });
    }, []);
    //   kirim ke server

    const kirim = () => {
        console.error(data);

        setLoading(true);

        axios
            .post('https://motekarpulsa.zavalabs.com/api/1add_transaksi.php', data)
            .then(x => {
                setLoading(false);

                console.log('respose server', x.data);
                navigation.navigate('Add2', data);
            });
    };


    const [bank, setBank] = useState([]);

    const [buka, setBuka] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    position: 'relative',
                    padding: 20,

                }}>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        width: 80,
                        height: 30,
                        padding: 5,

                        backgroundColor: colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: 2
                        }, shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{
                            backgroundColor: colors.primary,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 28,
                        }}>Close</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: windowHeight / 1.5,
                        backgroundColor: "white",
                        padding: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>

                        {/* bank */}


                        <ScrollView>
                            {bank.map(bank => {
                                return (
                                    <TouchableOpacity

                                        onPress={() => {
                                            setModalVisible(false);
                                            setData({
                                                ...data,
                                                bank: bank.nama,
                                                bank_image: bank.image
                                            });
                                            if (bank.nama === 'Bank Lainnya') {
                                                setBuka(true);
                                            } else {
                                                setBuka(false);
                                            }
                                        }}

                                        style={{
                                            flexDirection: 'row',
                                            padding: 5,
                                            marginVertical: 2,
                                        }}>
                                        <View>
                                            <Image source={{
                                                uri: bank.image
                                            }} style={{
                                                height: 30, aspectRatio: 1,
                                                resizeMode: 'contain'
                                            }} />
                                        </View>
                                        <View style={{
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                fontFamily: fonts.secondary[600],
                                                color: colors.black,
                                                left: 10,
                                                fontSize: windowWidth / 28,
                                            }}>{bank.nama}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )

                            })}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
            <ScrollView
                style={{
                    padding: 10,
                }}>
                <Image source={{ uri: item.image }} style={{
                    width: windowWidth,
                    height: 100,
                    resizeMode: 'contain'
                }} />
                <View style={{
                    justifyContent: "flex-end",
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 26,
                    }}>Rate : {item.harga_asset}</Text>
                </View>






                <MyGap jarak={5} />
                <MyInput
                    autoFocus={true}
                    value={data.no_hp}
                    onChangeText={x =>
                        setData({
                            ...data,
                            no_hp: x,
                        })
                    }
                    label="Nomor Handphone"
                    iconname="call-outline"
                    keyboardType="number-pad"
                />
                <MyGap jarak={5} />
                <MyInput
                    autoFocus={true}
                    value={data.pulsa}
                    onChangeText={x =>
                        setData({
                            ...data,
                            pulsa: x,
                            harga: x * item.harga_asset,
                        })
                    }
                    label="Jumlah Pulsa Yang di Transfer"
                    iconname="options-outline"
                    keyboardType="number-pad"
                />
                <MyGap jarak={5} />


                <View style={{
                    paddingVertical: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        left: 10,
                        fontSize: 16,
                    }}>
                        Uang Diterima
                    </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.secondary,
                        left: 10,
                        fontSize: windowWidth / 10,
                    }}>
                        Rp.{new Intl.NumberFormat().format(data.harga)}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                    }}>
                    <Icon type="ionicon" name="business-outline" color={colors.primary} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            left: 10,
                            fontSize: 16,
                        }}>
                        Bank
                    </Text>
                </View>

                <TouchableOpacity

                    onPress={() => setModalVisible(true)}

                    style={{
                        borderColor: colors.primary,
                        borderRadius: 10,
                        borderWidth: 1,
                        paddingLeft: 10,
                        flexDirection: 'row',

                    }}
                >
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Image source={{
                            uri: data.bank_image

                        }} style={{
                            height: 50, width: 50, aspectRatio: 1,
                            resizeMode: 'contain'
                        }} />
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontSize: 18,
                            padding: 15,
                            fontFamily: fonts.primary[400],
                        }}>{data.bank}</Text>
                    </View>

                </TouchableOpacity>
                <MyGap jarak={5} />

                {buka && <MyInput iconname="business-outline" label="Bank Lainnya" value={data.bank} onChangeText={x => setData({
                    ...data,
                    bank: x
                })} />}

                <MyInput iconname="card-outline" keyboardType="number-pad" label="Nomor Rekening / Nomor Handphone" value={data.rekening} onChangeText={x => setData({
                    ...data,
                    rekening: x
                })} />
                <MyInput iconname="person-outline" label="Atas Nama" value={data.atas_nama} onChangeText={x => setData({
                    ...data,
                    atas_nama: x
                })} />

                {/* <UploadFoto
                    onPress1={() => getCamera(1)}
                    onPress2={() => getGallery(1)}
                    label="Upload Foto / Bukti Transfer Pulsa"
                    foto={foto}
                /> */}
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
