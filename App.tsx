import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigation/MainNavigator';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {persistStore} from 'redux-persist';
import {store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle={'dark-content'}
          />
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';
// import Product from './src/features/Home/Product/Product';
// import ProductDetail from './src/features/Home/ProductDetail/ProductDetail';

// const Drawer = createDrawerNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="ProductScreen">
//         <Drawer.Screen name="ProductScreen" component={Product} />
//         <Drawer.Screen name="ProductDetailScreen" component={ProductDetail} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
