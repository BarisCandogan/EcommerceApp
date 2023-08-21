import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {productStyles} from './ProductStyle';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';
import {
  categoryPress,
  getCategories,
  homePressed,
} from '../../../store/Product/ProductSlice';

const Product = () => {
  const USER_TOKEN = useAppSelector(state => state.auth.token);
  const categoryId = useAppSelector(state => state.product.id);
  const categoryState = useAppSelector(state => state.product.categoryPress);
  const homeState = useAppSelector(state => state.product.homePress);

  const [products, setProducts] = useState();
  const [category, setCategory] = useState(false);

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();

  const onCategoryPressed = (category_id: number) => {
    setCategory(true);
    axios({
      method: 'GET',
      url: `https://demoapi.webudi.tech/api/categories/${category_id}`,
      headers: {Authorization: 'Bearer ' + USER_TOKEN},
    })
      .then(response => {
        setProducts(response.data.products.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    dispatch(categoryPress(false));
    axios({
      method: 'GET',
      url: 'https://demoapi.webudi.tech/api/products',
      headers: {Authorization: 'Bearer ' + USER_TOKEN},
    })
      .then(response => {
        setProducts(response.data.products.data);
        setCategory(false);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (homeState === true) {
      dispatch(categoryPress(false));
      axios({
        method: 'GET',
        url: 'https://demoapi.webudi.tech/api/products',
        headers: {Authorization: 'Bearer ' + USER_TOKEN},
      })
        .then(response => {
          setProducts(response.data.products.data);
          dispatch(homePressed(false));
          setCategory(false);
        })
        .catch(error => console.log(error));
    }
  }, [homeState === true]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://demoapi.webudi.tech/api/categories',
      headers: {Authorization: 'Bearer ' + USER_TOKEN},
    })
      .then(response => {
        dispatch(getCategories(response.data.categories));
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (categoryState === true) {
      setCategory(true);
      axios({
        method: 'GET',
        url: `https://demoapi.webudi.tech/api/categories/${categoryId}`,
        headers: {Authorization: 'Bearer ' + USER_TOKEN},
      })
        .then(response => {
          setProducts(response.data.products.data);
          dispatch(categoryPress(false));
        })
        .catch(error => console.log(error));
    }
  }, [categoryState === true]);

  return (
    <>
      <View style={productStyles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={products}
          numColumns={2}
          renderItem={product => (
            <View style={productStyles.productPosition} key={product.item.id}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    product: product.item,
                  });
                }}
                style={({pressed}) => [
                  {
                    alignItems: 'center',
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
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
                {category ? null : (
                  <Pressable
                    style={{borderBottomWidth: 1}}
                    onPress={() => onCategoryPressed(product.item.category_id)}>
                    <Text style={{color: 'black'}}>
                      {product.item.category.title}
                    </Text>
                  </Pressable>
                )}
              </Pressable>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Product;
