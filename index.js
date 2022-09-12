import React from 'react';
import {Navigation} from 'react-native-navigation';
import store, {persistor} from './src/app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './src/screens/Home'
import DetailScreen from './src/screens/Detail'

Navigation.registerComponent(
  'Home',
  () => props =>
    (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomeScreen {...props} />
        </PersistGate>
      </Provider>
    ),
  () => 'Home',
);

Navigation.registerComponent(
  'HomeScreen',
  () => props =>
    (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <HomeScreen {...props} />
        {/* </PersistGate> */}
      </Provider>
    ),
  () => 'HomeScreen',
);

Navigation.registerComponent(
  'DetailScreen',
  () => props =>
    (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DetailScreen {...props} />
        </PersistGate>
      </Provider>
    ),
  () => 'DetailScreen',
);

const mainRoot = {
  root: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'HomeScreen',
                },
              },
            ],
          },
        },

        {
          stack: {
            children: [
              {
                component: {
                  name: 'DetailScreen',
                },
              },
            ],
          },
        },
      ],
  },
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a',
  },
  topBar: {
    title: {
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
  Navigation.setRoot(loginRoot);
});
DetailScreen.options = {
  topBar: {
    title: {
      text: 'DetailScreen',
    },
  },
  bottomTab: {
    text: 'DetailScreen',
  },
};

const loginRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'DetailScreen',
          },
          component : {
            name: 'HomeScreen'
          }
        }
      ]
    }

  
  }
};




