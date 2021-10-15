import * as React from 'react';

import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import PiwikProSdk from 'react-native-piwik-pro-sdk';

export default function App() {
  const [result, setResult] = React.useState<{
    message: String;
    error?: Error;
  }>({ message: 'Press any button' });
  const [eventNum, setEventNum] = React.useState<number>(1);
  const [dispatchInterval, setDispatchInterval] = React.useState<number>(120);

  const initializePiwikProSdk = async () => {
    PiwikProSdk.init(
      'https://your.piwik.pro.server.com',
      '01234567-89ab-cdef-0123-456789abcdef'
    )
      .then(() => setResult({ message: 'Success' }))
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const trackScreen = () => {
    PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, undefined)
      .then(() => {
        setResult({ message: `Success track screen ${eventNum}` });
        setEventNum(eventNum + 1);
      })
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const trackScreenWithCustomDimensions = async () => {
    await PiwikProSdk.trackScreen(`your_activity_path${eventNum}`, 'title', {
      1: 'beta1',
      2: 'gamma1',
    })
      .then(() => {
        setResult({ message: `Success track screen ${eventNum}` });
        setEventNum(eventNum + 1);
      })
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const dispatchEvents = () => {
    PiwikProSdk.dispatch()
      .then(() => setResult({ message: 'Dispatched successfully' }))
      .catch((error) => setResult({ message: 'Error', error }));
  };

  const changeDispatchInterval = () => {
    PiwikProSdk.setDispatchInterval(dispatchInterval)
      .then(() => setResult({ message: 'Change successfully' }))
      .catch((error) => setResult({ message: 'Error', error }));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Initialize Piwik Pro SDK"
        onPress={initializePiwikProSdk}
      />
      <Button title="Track screen" onPress={trackScreen} />
      <Button
        title="Track screen with custom dimensions"
        onPress={trackScreenWithCustomDimensions}
      />
      <Button title="Dispatch events" onPress={dispatchEvents} />
      <TextInput
        value={dispatchInterval.toString()}
        onChangeText={(text) => setDispatchInterval(parseInt(text, 10) || 0)}
      />
      <Button title="Set dispatch interval" onPress={changeDispatchInterval} />
      <Text>Result: {result.message}</Text>
      {result.error && <Text>Error type: {result.error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    width: '60%',
  },
});
