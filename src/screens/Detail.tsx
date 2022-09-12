import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {baseURL, imageURL} from '../constant';
import api from '../api';

interface DetailType {
  componentId: string;
  data: {
    name: string;
    url: string;
  };
}
interface Options {
  options: {
    topBar: {
      title: {
        color: string;
      };
    };
  };
}

const DetailScreen: Options = (props: DetailType) => {
  const params = props?.data?.name;

  const [details, setDetails] = useState<any>([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    if (params == undefined) return;
    const {data} = await api.get(`${baseURL}${params}`);
    setDetails(data);
  };

  return details.name ? (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FastImage
        style={styles.image}
        source={{
          uri: imageURL(details.name),
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

DetailScreen.options = {
  topBar: {
    title: {
      color: 'white',
    },
  },
};

export default DetailScreen;
