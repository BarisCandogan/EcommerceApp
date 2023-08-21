import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../../Components/Button/Button';
import Topbar from '../../../Components/Topbar/Topbar';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {addProduct, getProduct} from '../../../store/Product/ProductSlice';

type Props = {
  route: {
    params: {
      product: any;
    };
  };
};

const ProductDetail = ({route}: Props) => {
  const {product} = route.params;
  const addedProduct = useAppSelector(state => state.product.product);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState(addedProduct);

  const onButtonPressed = () => {
    setProducts(prev => [...prev, product]);
  };
  useEffect(() => {
    if (products) {
      dispatch(addProduct(products));
    }
  }, [products]);

  useEffect(() => {
    dispatch(getProduct(product));
  }, []);

  return (
    <>
      <Topbar name={product.title} navigate="DrawerNavigationScreen" />
      <View
        style={{
          flex: 6,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          style={{
            height: 200,
            width: 250,
            borderRadius: 10,
          }}
          source={{uri: `${product.image}`}}
        />
        <Text style={{margin: 15, color: 'black'}}>{product.title}</Text>
        <Text style={{margin: 15, color: 'black'}}>{product.price}</Text>
        <Text style={{textAlign: 'center', marginBottom: 100, color: 'black'}}>
          {product.description}
        </Text>
        <Button buttonText="Add To Basket" onPress={() => onButtonPressed()} />
      </View>
    </>
  );
};

export default ProductDetail;
