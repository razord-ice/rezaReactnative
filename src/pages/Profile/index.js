/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {gql} from 'apollo-boost';
import globalStyles from '../../asset/global/style';
import AUTH_ACTION from '../../stores/actions/auth';
import {connect} from 'react-redux';
import {query} from '../../services/graphql/api';

const gqlNotification = gql`
    {
        customerNotificationList {
            items {
                entityId
                unread
                createdAt
                content
                subject
            }
        }
    }
`;

const NotificationItem = ({item}) => {
  return (
      <View>
          <Text>{item.createdAt}</Text>
          <Text>{item.subject}</Text>
          <Text>{item.content}</Text>
      </View>
  );
};

const Profile = ({route}) => {
    const [notif, setNotif] = useState([]);
    const [loading, setIsLoading] = useState(true);

    query(gqlNotification).then((res) => {
        const notification = res.data.customerNotificationList.items;
        console.log(notification);
        setNotif(notification);
        setIsLoading(false);
    });

    if (loading) {
        return <Text>Please Wait...</Text>;
    }

    return (
        <ScrollView style={globalStyles.margin}>
            <Text style={globalStyles.title}>Your Notification</Text>
            <FlatList
                data={notif}
                keyExtractor={(item) => item.entityId}
                renderItem={(item) => <NotificationItem data={item} />}
            />
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setSign: (data) => dispatch(AUTH_ACTION.set(data)),
  });
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
