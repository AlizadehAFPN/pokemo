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
          <DetailScreen setDefaultOptions={topBar={title:{text:'hiiii'}}} {...props} />
      </Provider>
    ),
  () => 'DetailScreen',
);

// Default configs for all the screens
Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
      text:'Pokemons ',
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
// Add the new screen to Root js file and make sure the component name is the same as the name of the registerComponent
 
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(Root);
});