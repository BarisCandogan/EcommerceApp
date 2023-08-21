import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';
import {useAppSelector} from '../../../hooks/reduxHooks';
import Input from '../../../Components/Input/Input';
import {useForm} from 'react-hook-form';
import Topbar from '../../../Components/Topbar/Topbar';
import Button from '../../../Components/Button/Button';
import axios from 'axios';

const UpdateProfile = () => {
  const user = useAppSelector(state => state.auth.user);
  const USER_TOKEN = useAppSelector(state => state.auth.token);

  const {control, handleSubmit, watch} = useForm();
  const regex_Password = /^.{6,}$/;

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();

  const onUpdatePressed = () => {
    axios({
      method: 'post',
      url: 'https://demoapi.webudi.tech/api/update-profile',
      headers: {Authorization: 'Bearer ' + USER_TOKEN},
      data: {
        name: user.name,
        email: user.email,
        password: password,
        password_confirmation: confirmPassword,
      },
    })
      .then(response => {
        Alert.alert('Your Password Successfully Changed');
        navigation.navigate('DrawerNavigationScreen');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Topbar name="Update Profile" navigate="ProfileScreen" />
      <View
        style={{
          flex: 6,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: '800',
            marginBottom: 100,
          }}>
          Update Your Profile
        </Text>
        <Input
          control={control}
          name={'name'}
          placeholder="Name"
          value={user.name}
        />
        <Input
          control={control}
          name={'email'}
          placeholder="Email"
          value={user.email}
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

        <Button buttonText="Update" onPress={handleSubmit(onUpdatePressed)} />
      </View>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
