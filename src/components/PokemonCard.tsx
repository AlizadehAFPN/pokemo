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
      style={styles.mainContainer}>
      <FastImage
        style={styles.mainImage}
        source={{
          uri:imageURL(props?.item?.name),
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.mainText}>{props?.item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    height: 180,
    width:'50%' ,
    minWidth:180,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius:8,
    borderWidth:1,
    borderColor:'#EAEAEA',
  },
  mainImage: {width: 120, height: 120},
  mainText: {
    color:'black',
    fontSize:16,
    lineHeight:20
  },
});

export default memo(PokemonCard);
