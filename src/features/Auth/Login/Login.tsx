import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../../Components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {getToken, getUser, isUserSignedIn} from '../../../store/Auth/AuthSlice';

const Login = () => {
  const {control, handleSubmit, watch} = useForm();
  const dispatch = useAppDispatch();
  const regex_Email = /^\S+@\S+\.\S+$/;
  const regex_Password = /^.{5,}$/;

  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();

  const email = watch('email');
  const password = watch('password');

  const onSignInPressed = () => {
    axios({
      method: 'post',
      url: 'https://demoapi.webudi.tech/api/login',
      data: {
        email: email,
        password: password,
      },
    })
      .then(response => {
        if (response.data.status === true) {
          dispatch(getToken(response.data.token));
          dispatch(getUser(response.data.user));
        } else {
          Alert.alert('Your Email Or Password Is Incorrect');
        }
      })
      .catch(() => Alert.alert('Your Email Or Password Is Incorrect'));
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 'bold',
          marginBottom: 100,
        }}>
        Sign In
      </Text>

      <Input
        control={control}
        name={'email'}
        placeholder="Email"
        rules={{
          required: 'Invalid Email',
          pattern: {
            value: regex_Email,
            message: 'Invalid Email',
          },
        }}
      />
      <Input
        control={control}
        name={'password'}
        placeholder="Password"
        security={true}
        rules={{
          required: 'Invalid Password',
          pattern: {
            value: regex_Password,
            message: 'Invalid Password',
          },
        }}
      />

      <Button buttonText="Login" onPress={handleSubmit(onSignInPressed)} />
      <Button
        secondary={true}
        buttonText="Sign Up"
        onPress={() => navigation.navigate('RegisterScreen')}
        // navigate="RegisterScreen"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d83ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 26,
    width: 361,
    borderWidth: 2,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    backgroundColor: 'white',
    height: 56,
    marginVertical: 2,
  },
  inputStyle: {
    paddingLeft: 14,
    fontSize: 14,
    height: '100%',
    width: '100%',
  },
});
