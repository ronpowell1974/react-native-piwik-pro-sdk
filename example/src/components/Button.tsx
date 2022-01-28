import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface ButtonProps {
  onPress: () => void;
  text: string;
}

export function Button({ onPress, text }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
