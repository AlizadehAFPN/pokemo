import React from 'react';
import {Navigation} from 'react-native-navigation';
import store, {persistor} from './src/app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './src/screens/Home'
import DetailScreen from './src/screens/Detail'
import Root from './src/Root';

// Defining Home screen connected to redux and persisted for preventing multipe API call
Navigation.registerComponent(
  'HomeScreen',
  () => props =>
    ( 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomeScreen {...props} />
        </PersistGate>
      </Provider>
    ),
  () => 'HomeScreen',
);

Navigation.registerComponent(
  'DetailScreen',
  () => props =>
    (
      <Provider store={store}>
          <DetailScreen {...props} />
      </Provider>
    ),
  () => 'DetailScreen',
);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      text:'Pokemons List',
      color: 'white',
    },
    backButton: {
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(Root);
});






