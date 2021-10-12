# React Native Piwik PRO SDK

Piwik PRO SDK for React Native

## Installation

```sh
npm install react-native-piwik-pro-sdk
```

## Configuration

```js
import PiwikProSdk from "react-native-piwik-pro-sdk";

// ...

PiwikProSdk.init(
  'https://example.piwik.pro/',
  '6565aa65-8f8f-4242-abc1-9876dcbaabcd'
)
  .then(() => console.log('Piwik PRO SDK initialized successfully'))
  .catch((error) => console.log(error));
```

## Tracking screen views

```js
PiwikProSdk.trackScreen('your_activity_path', 'title')
  .then(() => {
    setResult({ message: `Success track screen ${eventNum}` });
    setEventNum(eventNum + 1);
  })
  .catch((error) => setResult({ message: 'Error', error }));
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
