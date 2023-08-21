import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Topbar from '../../../Components/Topbar/Topbar';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Pressable} from 'react-native';
import {
  addProduct,
  clearProduct,
  deleteProduct,
} from '../../../store/Product/ProductSlice';
import Button from '../../../Components/Button/Button';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';

const Basket = () => {
  const addedProduct = useAppSelector(state => state.product.product);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState(addedProduct);
  const [addPressed, setAddPressed] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();

  const result = addedProduct.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );

  const onDeletePressed = id => {
    dispatch(deleteProduct(id));
  };

  const onAddPresssed = item => {
    setProducts(prev => [...prev, item]);
    setAddPressed(true);
  };

  const onClearPressed = () => {
    dispatch(clearProduct());
    Alert.alert('Your Wish List Succesfully Deleted');
    navigation.navigate('DrawerNavigationScreen');
  };

  useEffect(() => {
    if (products && addPressed === true) {
      dispatch(addProduct(products));
      setAddPressed(false);
    }
  }, [products && addPressed === true]);

  useEffect(() => {
    if (addedProduct) {
      setProducts(addedProduct);
    }
  }, [addedProduct]);

  return (
    <>
      <Topbar name="Basket" navigate="DrawerNavigationScreen" />
      <View style={{flex: 6, backgroundColor: 'white', alignItems: 'center'}}>
        <View style={{height: 600}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={addedProduct}
            numColumns={2}
            renderItem={product => (
              <View style={styles.productPosition}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Pressable onPress={() => onDeletePressed(product.item.id)}>
                    <AntDesign color={'black'} size={20} name="close" />
                  </Pressable>
                  <Pressable onPress={() => onAddPresssed(product.item)}>
                    <AntDesign color={'black'} size={20} name="plus" />
                  </Pressable>
                </View>
                <Image
                  style={{
                    height: 100,
                    width: 150,
                    borderRadius: 10,
                  }}
                  source={{uri: `${product.item.image}`}}
                />
                <Text style={{color: 'black'}}>{product.item.title}</Text>
                <Text style={{color: 'black'}}>{product.item.price}</Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            borderTopWidth: 1,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>
            Total Amount:{result}
          </Text>
          {addedProduct.length == 0 ? null : (
            <Pressable onPress={() => onClearPressed()}>
              <EvilIcons color={'red'} size={30} name="trash" />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default Basket;

const styles = StyleSheet.create({
  productPosition: {
    backgroundColor: 'white',
    elevation: 7,
    width: 150,
    height: 180,
    margin: 10,
    borderRadius: 10,
  },
});
