import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
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
      1: 'beta',
      2: 'gamma',
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={initializePiwikProSdk}
          >
            <Text style={styles.buttonText}>Initialize Piwik Pro SDK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={trackScreen}>
            <Text style={styles.buttonText}>Track screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={trackScreenWithCustomDimensions}
          >
            <Text style={styles.buttonText}>
              Track screen with custom dimensions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={dispatchEvents}>
            <Text style={styles.buttonText}>Dispatch events</Text>
          </TouchableOpacity>

          <TextInput
            value={dispatchInterval.toString()}
            onChangeText={(buttonText) =>
              setDispatchInterval(parseInt(buttonText, 10) || 0)
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={changeDispatchInterval}
          >
            <Text style={styles.buttonText}>Set dispatch interval</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text style={styles.message}>Result: {result.message}</Text>
      {result.error && (
        <Text style={styles.message}>Error type: {result.error.message}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
