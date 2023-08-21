import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Product from '../../features/Home/Product/Product';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  categoryPress,
  getCategoryId,
  homePressed,
} from '../../store/Product/ProductSlice';
import {logOut} from '../../store/Auth/AuthSlice';

const Drawer = createDrawerNavigator();

export type RookStackDrawerParams = {
  Home: any;
};

const drawerMenu = () => {
  const category = useAppSelector(state => state.product.categories);
  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackDrawerParams>>();
  const dispatch = useAppDispatch();

  const onCategoryPressed = id => {
    dispatch(getCategoryId(id));
    dispatch(categoryPress(true));
  };

  const onHomePressed = () => {
    dispatch(homePressed(true));
  };

  return (
    <>
      <View style={{marginTop: 50}}>
        <Pressable onPress={() => onHomePressed()}>
          <Text style={styles.text}>Home</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.text}>Profile</Text>
        </Pressable>
        <Text
          style={[
            styles.text,
            {
              borderBottomWidth: 1,
            },
          ]}>
          Categories
        </Text>
        {category.map(item => {
          return (
            <Pressable key={item.id} onPress={() => onCategoryPressed(item.id)}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: 1,
                  marginLeft: 5,
                }}>
                {item.title}
              </Text>
            </Pressable>
          );
        })}
        <Pressable style={{marginTop: 50}} onPress={() => dispatch(logOut())}>
          <Text style={styles.text}>Log Out</Text>
        </Pressable>
      </View>
    </>
  );
};

const DrawerNavigation = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={drawerMenu} initialRouteName="Home">
        <Drawer.Screen name="Home" component={Product} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
