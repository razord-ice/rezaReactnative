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
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {mutate} from '../../services/graphql/api';
import {gql} from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../asset/global/style';
import loginStyle from '../../asset/page/login';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('tomo@icube.us');
  const [password, setPassword] = useState('Admin123');

  const gotoHome = () => {
    navigation.navigate('Home', { email: username });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        gotoHome();
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async value => {
    try {
      let dataFormat = {
        type: 'signIn',
        token: value,
      };
      const jsonValue = JSON.stringify(dataFormat);
      await AsyncStorage.setItem('token', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const postLogin = () => {
    let schema = gql`
      mutation generateCustomerTokenCustom($email: String!, $pass: String!) {
        generateCustomerTokenCustom(username: $email, password: $pass) {
          token
        }
      }
    `;

    let params = {email: username, pass: password};

    mutate(schema, params).then(res => {
      const {data} = res;
      const user = data.generateCustomerTokenCustom;
      getData(user.token);
      storeData(user.token);
      // console.log(user.token);
    });
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={loginStyle.box}>
            <Text style={loginStyle.label}>Username</Text>
            <TextInput style={globalStyles.inputText}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <View />
            <Text style={loginStyle.label}>Password</Text>
            <TextInput style={globalStyles.inputText}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={true}
            />
            <View />
            <TouchableOpacity style={globalStyles.button} onPress={postLogin}>
              <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;
