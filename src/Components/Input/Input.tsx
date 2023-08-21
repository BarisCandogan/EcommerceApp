import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {Control, Controller} from 'react-hook-form';

type Props = {
  control: Control;
  name: string;
  rules?: object;
  placeholder?: string;
  security?: boolean;
  value?: string;
};

const Input = ({
  control,
  name,
  rules = {},
  security,
  placeholder,
  value,
}: Props) => {
  const [invisible, setInvisible] = useState(true);
  const {width} = useWindowDimensions();

  const onSecurityPressed = () => {
    setInvisible(false);
    if (!invisible) {
      setInvisible(true);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              style={[styles.inputStyle]}
              placeholder={placeholder}
              placeholderTextColor={'gray'}
              onBlur={onBlur}
              secureTextEntry={security && invisible ? true : false}
              onChangeText={onChange}
              autoCapitalize="none"
            />

            {security ? (
              <Pressable
                onPress={() => onSecurityPressed()}
                style={{
                  position: 'absolute',
                  left: 320,
                  top: 13,
                }}>
                <Feather
                  size={25}
                  name={invisible ? 'eye-off' : 'eye'}
                  color={'gray'}
                />
              </Pressable>
            ) : null}
            <View style={{width: '100%', alignItems: 'center'}}>
              {error && (
                <Text style={{color: 'black', fontSize: 14}}>
                  {error.message || 'error'}
                </Text>
              )}
            </View>
          </View>
        </>
      )}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
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
