import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Settings from './screens/Settings';
import AudienceManager from './screens/AudienceManager';
import TrackingActions from './screens/TrackingActions';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import { styles } from './styles';
import { useAppSelector } from './store/hooks';
import { messageSelector } from './store/appSlice';
import { Divider } from 'react-native-elements';

const Stack = createNativeStackNavigator();

export default function App() {
  const message = useAppSelector(messageSelector);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={'padding'}
        enabled={Platform.OS === 'ios'}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tracking Actions" component={TrackingActions} />
            <Stack.Screen name="Audience Manager" component={AudienceManager} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
        <Divider width={2} />
        <ScrollView
          style={styles.messageBox}
          contentContainerStyle={styles.messageBoxContent}
        >
          <Text style={styles.message}>{message}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
