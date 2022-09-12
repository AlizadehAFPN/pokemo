import {Text, TouchableOpacity, StyleSheet, GestureResponderEvent} from 'react-native';
import React, {
  memo,
} from 'react';
import FastImage from 'react-native-fast-image';
import { imageURL } from '../constant';

interface PokemonCardType  {
  item: {name:string ; url:string};
  onPress: ((event: GestureResponderEvent) => void) ;

}
const PokemonCard = (props: PokemonCardType) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <FastImage
        style={{width: 150, height: 150}}
        source={{
          uri:imageURL(props?.item?.name),
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text>{props?.item.name}</Text>
    </TouchableOpacity>
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

export default memo(PokemonCard);
