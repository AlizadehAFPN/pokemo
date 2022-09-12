import React, { FC } from 'react';
import {Navigation} from 'react-native-navigation';

export const persistKey = 'root1';

export const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

// function for the image URL
export const imageURL = (name: string) =>
  `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`;

  // to have a cleaner code, I decided to make helper function 

export const changeScreen = (props: IProps, item: any , name:string) =>
  Navigation.push(props.componentId, {
    component: {
      name, // Push the screen registered with the 'Settings' key
      options: {
        // Optional options object to configure the screen
        topBar: {
          title: {
            text: item.name, // Set the TopBar title of the new Screen
          },
        },
      },
      passProps: {
        data: item,
      },
    },
});

interface IProps {
  componentId:string
}


// export const createScreen = (Item : FC,name:string ) => (
//   Navigation.registerComponent(
//     name,
//     () => props =>
//       ( 
//         <Provider store={store}>
//           <PersistGate loading={null} persistor={persistor}>
//             <Item {...props} />
//           </PersistGate>
//         </Provider>
//       ),
//     () => Item,
//   )
// )

