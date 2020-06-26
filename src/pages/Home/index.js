/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../asset/global/style';

const Home = ({route, navigation}) => {
const { email } = route.params;
  const gotoLanding = () => {
    navigation.navigate('Landing');
  };
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      // remove error
    }
    gotoLanding();
    console.log('Done.');
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={globalStyles.margin}>
            <Text style={globalStyles.h1}>Sukses Login!!</Text>
            <Text style={globalStyles.welcome}>Selamat datang, {email}</Text>
            <TouchableOpacity style={globalStyles.buttonLogout} onPress={logOut}>
              <Text style={globalStyles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
