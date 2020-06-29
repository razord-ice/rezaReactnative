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
  Platform
} from 'react-native';
import {mutate} from '../../services/graphql/api';
import {gql} from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../asset/global/style';
import loginStyle from '../../asset/page/login';
import {connect} from 'react-redux';
import AUTH_ACTION from '../../stores/actions/auth';

const Login = ({navigation, setLogin}) => {
  const [username, setUsername] = useState('tomo@icube.us');
  const [password, setPassword] = useState('Admin123');

  // const [username, setUsername] = useState(Platform.OS === 'ios' ? '' : null);
  // const [password, setPassword] = useState(Platform.OS === 'ios' ? '' : null);

  const getData = async () => {
    let response = null;

		try {
			response = await AsyncStorage.getItem('token');
			response = response !== null ? response : null;
		} catch (error) {
			console.log(error);
		}
		return response;
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      console.log(error);
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
      console.log('user ' + user);
      storeData(user.token);
      let dataFormat = {
        type: 'login',
        token: user.token,
      };
      setLogin(dataFormat);
      if (user.token !== null) {
        navigation.navigate('Home', {email: username});
        }
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

const mapDispatchToProps = (dispatch) => ({
  setLogin: (data) => dispatch(AUTH_ACTION.setToken(data)),
});
export default connect(null, mapDispatchToProps)(Login);
