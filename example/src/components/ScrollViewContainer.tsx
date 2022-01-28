import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from '../styles';

interface ScrollViewContainerProps {
  children: ReactNode;
}

export function ScrollViewContainer({ children }: ScrollViewContainerProps) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.subContainer}>{children}</View>
    </ScrollView>
  );
}
