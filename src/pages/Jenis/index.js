import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

export default function ({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
            }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Akses', {
                    jenis: 'KANTOR'
                })}
                style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    borderRadius: 10,
                }}>
                <Icon
                    type="ionicon"
                    name="business"
                    size={windowWidth / 4}
                    color={colors.white}
                />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 15,
                    }}>
                    OFFICE / KANTOR
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Akses', {
                    jenis: 'DINAS LUAR'
                })}
                style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    borderRadius: 10,
                }}>
                <Icon
                    type="ionicon"
                    name="home"
                    size={windowWidth / 4}
                    color={colors.white}
                />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 15,
                    }}>
                    DINAS LUAR / WFH
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
