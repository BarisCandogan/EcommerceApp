import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from '../../features/Home/Product/Product';
import Login from '../../features/Auth/Login/Login';
import Register from '../../features/Auth/Register/Register';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';
import ProductDetail from '../../features/Home/ProductDetail/ProductDetail';
import Profile from '../../features/Profile/Profile/Profile';
import UpdateProfile from '../../features/Profile/UpdateProfile/UpdateProfile';
import Basket from '../../features/Home/Basket/Basket';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {isUserSignedIn} from '../../store/Auth/AuthSlice';

export type RookStackParams = {
  LoginScreen: any;
  RegisterScreen: any;
  ProductScreen: any;
  MenuScreen: any;
  DrawerNavigationScreen: any;
  ProductDetail: any;
  HomeScreen: any;
  ProfileScreen: any;
  UpdateProfileScreen: any;
  BasketScreen: any;
};

const Stack = createNativeStackNavigator<RookStackParams>();
const MainNavigator = () => {
  const dispatch = useAppDispatch();

  const isUserSigned = useAppSelector(state => state.auth.signedIn);
  const USER_TOKEN = useAppSelector(state => state.auth.token);

  useEffect(() => {
    if (USER_TOKEN) {
      dispatch(isUserSignedIn(true));
    }
  }, [USER_TOKEN]);

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isUserSigned ? (
          <>
            <Stack.Screen
              name="DrawerNavigationScreen"
              component={DrawerNavigation}
            />
            <Stack.Screen name="HomeScreen" component={Product} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />

            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen
              name="UpdateProfileScreen"
              component={UpdateProfile}
            />
            <Stack.Screen name="BasketScreen" component={Basket} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="RegisterScreen" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
