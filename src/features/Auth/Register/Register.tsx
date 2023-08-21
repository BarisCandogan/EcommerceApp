import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../../Components/Button/Button';
import Topbar from '../../../Components/Topbar/Topbar';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';

const Register = () => {
  const {control, handleSubmit, watch} = useForm();

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  const regex_Name = /^[a-z ,.'-].{1,}$/i;
  const regex_Email = /^\S+@\S+\.\S+$/;
  const regex_Password = /^.{6,}$/;

  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();

  const onSignUpPressed = () => {
    axios({
      method: 'post',
      url: 'https://demoapi.webudi.tech/api/register',
      data: {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      },
    })
      .then(response => {
        Alert.alert('Your Account Successfully Created');
        navigation.navigate('LoginScreen');
      })
      .catch(() => Alert.alert('Please Try Again'));
  };

  return (
    <>
      <Topbar name="Sign Up" backButton={true} />
      <View style={styles.container}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 100,
          }}>
          Create Your Account
        </Text>

        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'position'}>
          <Input
            control={control}
            name={'name'}
            placeholder="Name"
            rules={{
              required: 'Invalid Name',
              pattern: {
                value: regex_Name,
                message: 'Invalid Name',
              },
            }}
          />
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
              required: 'Your Password Must Be 6 Characters Long',
              pattern: {
                value: regex_Password,
                message: 'Your Password Must Be 6 Characters Long',
              },
            }}
          />
          <Input
            control={control}
            name={'confirm_password'}
            placeholder="Confirm Your Password"
            security={true}
            rules={{
              required: 'Your Password Did Not Match',
              validate: () => {
                if (watch('confirm_password') != watch('confirm_password')) {
                  return 'Your Password Did Not Match';
                } else true;
              },
            }}
          />
        </KeyboardAvoidingView>

        <Button
          buttonText="Complete Your Registration"
          onPress={handleSubmit(onSignUpPressed)}
        />
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
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
