import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../navigation/MainNavigation/MainNavigator';
import {useAppSelector} from '../../hooks/reduxHooks';

type Props = {
  backButton?: boolean;
  name: string;
  navigate?: string;
};

const Topbar = ({backButton, name, navigate}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();
  const addedProduct = useAppSelector(state => state.product.product);

  return (
    <View style={styles.container}>
      {backButton ? (
        <>
          <Pressable
            onPress={() => navigation.replace('LoginScreen')}
            style={[styles.button, {position: 'absolute', marginLeft: 20}]}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </Pressable>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
              {name}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Pressable
            onPress={() => navigation.navigate(navigate)}
            style={[styles.button]}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </Pressable>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            {name}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('BasketScreen')}
            style={styles.button}>
            <View style={styles.notificationBackground}>
              <Text style={{color: 'white', fontSize: 12}}>
                {addedProduct.length}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="shopping-outline"
              size={20}
              color="black"
            />
          </Pressable>
        </>
      )}
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    borderRadius: 6,
    elevation: 7,
  },
  notificationBackground: {
    backgroundColor: '#2363F6',
    width: 17,
    height: 17,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
