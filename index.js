import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
// import store from './src/app/store';
import store, {persistor} from './src/app/store';
import {Provider} from 'react-redux';
import {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons} from './src/app/reducers';
import {PersistGate} from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

const LoginScreen = props => {
  const unsubscribe = NetInfo.addEventListener(state => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
  });

  // Unsubscribe
  unsubscribe();

  NetInfo.fetch().then(state => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
  });

  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const [searchfeild, setSearchfeild] = useState('');
  const pokemons = state?.data?.pokemons;

  console.log(pokemons.length);

  useEffect(() => {
    callPokemons(state?.data?.next ? state?.data?.next : baseURL);
  }, []);

  searchFun = async item => {
    setSearchfeild(item);
  };

  callPokemons = url => {
    dispatch(getPokemons(url));
  };

  const keyExtractor = useCallback((item, index) => item._id || `${index}`, []);

  const getItemLayout = useCallback(
    (data, index) => ({length: 180, offset: 180 * index, index}),
    [],
  );
  return (
    <View style={styles.root}>
      <View style={styles.searchCont}>
        <TextInput
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 16,
            width: '85%',
            alignSelf: 'center',
            borderRadius: 8,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#EAEAEA',
            marginTop: 16,
          }}
          placeholder="Search Pokemons"
          onChangeText={value => searchFun(value)}
          value={searchfeild}
        />

        <FlatList
          data={pokemons.filter(pokemon => pokemon.name.includes(searchfeild))}
          keyExtractor={keyExtractor}
          initialNumToRender={20}
          contentContainerStyle={{
            paddingHorizontal: 16,
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          maxToRenderPerBatch={20}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreadhold={0.3}
          getItemLayout={getItemLayout}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                Navigation.push(props.componentId, {
                  component: {
                    name: 'Settings', // Push the screen registered with the 'Settings' key
                    passProps: {
                      data: item,
                    },
                  },
                })
              }
              style={{
                height: 180,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <FastImage
                style={{width: 150, height: 150}}
                source={{
                  uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png`,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />

              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const HomeScreen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.root}>
      <View>
        <View style={styles.searchCont}></View>
      </View>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

const SettingsScreen = props => {
  const params = props?.data?.name;

  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
    if (params == undefined) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${params}`).then(
      async response => {
        try {
          const data = await response.json();
          setDetails(data);
        } catch (error) {
          console.log('Error happened here!');
          console.error(error);
        }
      },
    );
  };
  console.log(details, 'details');
  return details.name ? (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FastImage
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.text}>Name: {details.name}</Text>
      <Text style={styles.text}>Height: {details.height}</Text>
      <Text style={styles.text}>Weight: {details.weight}</Text>
      <Text style={styles.text}>
        Ability: {details.abilities[0].ability.name}
      </Text>
      <Text style={styles.text}>Type: {details.types[0].type.name}</Text>
    </View>
  ) : (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="#E63F34" />
    </View>
  );
};
SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings',
    },
  },
  bottomTab: {
    text: 'Settings',
  },
};

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
  'Login',
  () => props =>
    (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <LoginScreen {...props} />
        {/* </PersistGate> */}
      </Provider>
    ),
  () => 'Login',
);

Navigation.registerComponent(
  'Settings',
  () => props =>
    (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsScreen {...props} />
        </PersistGate>
      </Provider>
    ),
  () => 'Settings',
);

const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Login',
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
                  name: 'Home',
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
                  name: 'Settings',
                },
              },
            ],
          },
        },
      ],
    },
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
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(mainRoot);
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'whitesmoke',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 22,
    marginBottom: 15,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
