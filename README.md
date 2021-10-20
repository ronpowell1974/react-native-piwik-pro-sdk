# React Native Piwik PRO SDK

Piwik PRO SDK for React Native

## Installation

```sh
npm install react-native-piwik-pro-sdk
```

## Configuration

In order to set up the Piwik PRO tracker you have to call `init` method passing a server address and website ID (you can find it in `Administration` > `Sites & apps`):

```js
import PiwikProSdk from "react-native-piwik-pro-sdk";

// ...

await PiwikProSdk.init(
  'https://example.piwik.pro/',
  '6565aa65-8f8f-4242-abc1-9876dcbaabcd'
);
```

***Note:*** Each tracking method is implemented as a Promise which will be rejected if the `PiwikProSdk` has not been initialized.

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
