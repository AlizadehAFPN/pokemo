import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

const LoginScreen = () => {
    return (
      <View style={styles.root}>
        <Button
          title='Login'
          color='#710ce3'
          onPress={() => Navigation.setRoot(mainRoot)}
        />
      </View>
    );
  };
  
  const HomeScreen = (props) => {

    React.useEffect(() => {
        const listener = {
          componentDidAppear: () => {
            console.log('RNN', `componentDidAppear`);
          },
          componentDidDisappear: () => {
            console.log('RNN', `componentDidDisappear`);
          }
        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
        return () => {
          // Make sure to unregister the listener during cleanup
          unsubscribe.remove();
        };
      }, []);


    return (
      <View style={styles.root}>
        <Text>Hello React Native Navigation 👋</Text>
  
        <Button
          title='Push Settings Screen'
          color='#710ce3'
          onPress={() => Navigation.push(props.componentId, {
            component: {
              name: 'Settings'
            }
          })} />
      </View>
    );
  };
  HomeScreen.options = {
    topBar: {
      title: {
        text: 'Home'
      }
    },
    bottomTab: {
      text: 'Home'
    }
  };
  
  const SettingsScreen = () => {
    return (
      <View style={styles.root}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
  SettingsScreen.options = {
    topBar: {
      title: {
        text: 'Settings'
      }
    },
    bottomTab: {
      text: 'Settings'
    }
  }
  
  Navigation.registerComponent('Login', () => LoginScreen);
  Navigation.registerComponent('Home', () => HomeScreen);
  Navigation.registerComponent('Settings', () => SettingsScreen);
  
  const mainRoot = {
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home'
                  }
                },
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Settings'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  };
  const loginRoot = {
    root: {
      component: {
        name: 'Login'
      }
    }
  };
  
  
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: '#4d089a'
      }
    },
    bottomTab: {
      fontSize: 14,
      selectedFontSize: 14
    }
  });
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot(loginRoot);
  });
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'whitesmoke'
    }
  });