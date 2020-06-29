/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import store from './stores';
import Navigation from '../src/pages/Navigation';

const client = new ApolloClient({
  uri: 'https://lottemart.testingnow.me/graphql',
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
