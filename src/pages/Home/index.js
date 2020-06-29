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
import AUTH_ACTION from '../../stores/actions/auth';
import {connect} from 'react-redux';
import { gql } from 'apollo-boost';
import globalStyles from '../../asset/global/style';
import {query} from '../../services/graphql/api';

const gqlCustomerData = gql`
  {
    customer(selectedStore: 1) {
      email
      firstname
      lastname
      date_of_birth
      gender
    }
  }
`;

const Home = ({auth, navigation, setSign}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  query(gqlCustomerData).then((res) => {
    setUser(res.data.customer);
    setIsLoading(false);
  });
  
  const gotoProfile = () => {
    navigation.navigate('Profile');
  };

  const logOut = () => {
    setSign(null);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Please Wait .....</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={globalStyles.margin}>
            <Text style={globalStyles.h1}>Homepage</Text>
            <Text>Your Token: {auth.user.token}</Text>
            <Text style={globalStyles.welcome}>Selamat datang, {user.firstname} {user.lastname}</Text>
            <Text>Email : {user.email}</Text>
            <TouchableOpacity style={globalStyles.buttonLogout} onPress={logOut}>
              <Text style={globalStyles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button} onPress={gotoProfile}>
              <Text style={globalStyles.buttonText}>Profile & Notif</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSign: (data) => dispatch(AUTH_ACTION.set(data)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
