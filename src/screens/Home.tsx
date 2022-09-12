import {View, TextInput, FlatList, StyleSheet, Alert} from 'react-native';
import React, {
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  ReactNode,
  FC,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../app/reducers';
import PokemonCard from '../components/PokemonCard';
import {baseURL, changeScreen} from '../constant';
import api from '../api';
import { AppDispatch } from '../app/store';
interface Options {
  options: {
    topBar: {
      title:{
        text:string
        color:string
      }
    }
  }
}

const HomeScreen : Options = (props :{componentId:string} ) => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons : any = useSelector<IRootState>(state => state?.data?.pokemons);
  const [searchfeild, setSearchfeild] = useState<string>('');

  useEffect(() => {
    // check if we've persisted pokemons before or not
    if (pokemons.length > 0) {
      // no need to API call
      return;
    } else {
      // this is the first time the app is opened and we need to call the API list
      callPokemons(baseURL);
    }
  }, []);

  const searchFun = async (item: SetStateAction<string>) => {
    // update the search value
    setSearchfeild(item);
  };

  const callPokemons = async(url: string) => {
    let {data} = await api.get('/');
    // call API through the redux and thunk
    dispatch(getPokemons(data?.count));
  };

  const keyExtractor = useCallback(
    (
      item: {
        name: ReactNode;
        _id: any;
      },
      index: any,
    ) => item._id || `${index}`,
    [],
  );

  const getItemLayout = (data: any, index: number) => ({
    // optioanl: we'd better set length and offset for better performance
    length: 180,
    offset: 180 * index,
    index,
  });

  const VIEWABILITY = {
    // optional: for better performance
    minimumViewTime: 200,
    viewAreaCoveragePercentThreshold: 50,
  };

  const _renderitem = ({item} :any) => (
    // component for rendereing the pokemon items
    <PokemonCard
      onPress={() => changeScreen(props, item , 'DetailScreen')} // helper function for cleaner code
      item={item}
    />
  );

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.mainInput}
        placeholder="Search Pokemons"
        onChangeText={value => searchFun(value)}
        value={searchfeild}
      />
      {/* we can also use receycleview. better to also use this and compare the result */}
      <FlatList
        data={pokemons.filter((pokemon: {name: string | string[]}) =>
          pokemon.name.includes(searchfeild),
        )}
        keyExtractor={keyExtractor}
        removeClippedSubviews
        initialNumToRender={20}
        contentContainerStyle={styles.containerFlatlist}
        maxToRenderPerBatch={20}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReachedThreshold={0.3}
        getItemLayout={getItemLayout}
        renderItem={_renderitem}
        viewabilityConfig={VIEWABILITY}
        ListEmptyComponent={<View />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'whitesmoke',
    padding: 16,
  },
  containerFlatlist: {
    alignItems: 'center',
  },
  mainInput: {
    paddingHorizontal: 16,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom:16,
  },
});
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Pokemons List',
      color: 'white'
    },
  },
};

interface IRootState {
  data: any;
} 

export default HomeScreen;
