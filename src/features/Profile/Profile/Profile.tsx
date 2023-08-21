import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Topbar from '../../../Components/Topbar/Topbar';
import {useAppSelector} from '../../../hooks/reduxHooks';
import Button from '../../../Components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RookStackParams} from '../../../navigation/MainNavigation/MainNavigator';

const Profile = () => {
  const user = useAppSelector(state => state.auth.user);

  const navigation =
    useNavigation<NativeStackNavigationProp<RookStackParams>>();
  return (
    <>
      <Topbar name="Profile" navigate="DrawerNavigationScreen" />
      <View style={styles.container}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: '700',
              marginBottom: 50,
            }}>
            User Information
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Name</Text>
        </View>
        <Text style={styles.text}>{user.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Email</Text>
        </View>
        <Text style={styles.text}>{user.email}</Text>
        <View
          style={{
            alignItems: 'center',
            height: '40%',
            justifyContent: 'flex-end',
          }}>
          <Button
            buttonText="Change Your Password"
            onPress={() => navigation.navigate('UpdateProfileScreen')}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  text: {color: 'black', fontSize: 24, marginBottom: 10, fontWeight: '700'},
  title: {
    color: 'black',
    fontSize: 27,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
});
