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


## Tracking custom dimensions

To track a custom name-value pair assigned to your users or screen views, use [Custom Dimensions](https://help.piwik.pro/support/analytics/custom-dimension/). Note that the custom value data is not sent by itself, but only with other tracking actions such as screen views, events or other tracking actions (see the documentation of other tracking methods), for example:

```js
const customDimensions = {
  1: 'dashboard',
  2: 'menu',
}
await PiwikProSdk.trackScreen(`your_activity_path`, 'title', customDimensions);
```

`1` and `2` are dimension IDs. `dashboard`, `menu` are the dimension values for the tracked screen view event.


## Dispatching

Tracked events are stored temporarily on the queue and dispatched in batches every 30 seconds (default setting). This behavior can be changed in the following way:

```js
const dispatchInterval = 25; // 25 seconds
await PiwikProSdk.setDispatchInterval(dispatchInterval);
      
```

Parameters:
- `dispatchInterval: number` (*required*) - new dispatch interval (in seconds).

If `dispatchValue` is equal to `0` then events will be dispatched immediately. When its value is negative then events will not be dispatched automatically. This gives you full control over dispatch process using manual `dispatch`:

```js
await PiwikProSdk.dispatch();
      
```

You can obtain current `dispatchInterval` value with `getDispatchInterval`:

```js
const currentDispatchInterval = await PiwikProSdk.getDispatchInterval();
      
```
Returns:
- `dispatchInterval: number` - current dispatch interval (in seconds) or negative number if automatic dispatch has been disabled.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
