import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  buttonText: string;
  onPress?: () => void;
  secondary?: boolean;
};

const Button = ({buttonText, secondary, onPress}: Props) => {
  //<NativeStackNavigationProp<RookStackParams>>

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: secondary ? 'white' : '#2363F6',
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <Text
        style={{color: secondary ? '#2363F6' : 'white', fontWeight: 'bold'}}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    height: 60,
    elevation: 6,
  },
});
