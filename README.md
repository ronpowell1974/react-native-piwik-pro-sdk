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



## Data anonymization

Anonymization is the feature that allows tracking a user’s activity for aggregated data analysis even if the user doesn’t consent to track the data. If a user does not agree to be tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session (i.e. user ID, device ID) If the anonymization is enabled, a new visitor ID will be created each time the application starts.

Anonymization is enabled by default.

You can turn the anonymization on and off using the `setAnonymizationState` method:

```js
await PiwikProSdk.setAnonymizationState(false);
```

Parameters:
- `anonymizationState: boolean` (*required*) - new anonymization state.

You can also check the anonymization status using the `isAnonymizationOn` method:

```js
const anonymizationState = await PiwikProSdk.isAnonymizationOn();
```

Returns:
- `anonymizationState: boolean` - current anonymization state.



## Tracking screen views

```js
PiwikProSdk.trackScreen('your_activity_path', 'title')
  .then(() => {
    setResult({ message: `Success track screen ${eventNum}` });
    setEventNum(eventNum + 1);
  })
  .catch((error) => setResult({ message: 'Error', error }));
```


## Tracking custom variables

A [Custom Variable](https://piwik.pro/glossary/custom-variables/) is a custom name-value pair that you can assign to your users or screen views, and then visualize the reports of how many visits, conversions, etc. for each custom variable. A custom variable is defined by a name — for example, “User status” — and a value – for example, “LoggedIn” or “Anonymous”. It is required for names and values to be encoded in UTF-8.

Each custom variable has a scope. There are two types of custom variables scope - visit scope and screen scope. The visit scope can be used for any tracking action, and the screen scope can only be applied to tracking screen views.

To set the custom variable of the screen scope, use the `screenCustomVariables` object in the screen tracking method options:

```js
//TODO
```

To use the custom variable of the visit scope, use the `visitCustomVariables` object in the tracking method options:

```js
//TODO
```

Please note that for the Default custom variables option, use the custom variables of the visit scope with indexes 1-3.
Custom Variables is the object with the following format:
```js
const customVariables = {
  4: { name: 'food', value: 'pizza' },
  5: { name: 'drink', value: 'water' },
}
```
where:
- `index: number`, the key (*required*) – a given custom variable name must always be stored in the same “index” per session. For example, if you choose to store the variable with name “Gender” in index  `1` and you record another custom variable in index `1`, then the “Gender” variable will be deleted and replaced with a new custom variable stored in index `1`.
- `name: string` (*required*) – defines the name of a specific custom variable such as “User type” (Limited to 200 characters).
- `value: string` (*required*) – defines the value of a specific custom variable such as “Customer” (Limited to 200 characters).


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


## Default custom variables

SDK can automatically add information about the platform version, OS version and app version in custom variables with indexes 1-3. By default, this option is turned on. This can be changed via the `setIncludeDefaultCustomVars` method:
```js
await PiwikProSdk.setIncludeDefaultCustomVariables(true);
```
Parameters:
- `includeDefaultCustomVariables: boolean` (*required*) - flag that determines whether default custom variables should be added to each tracking event.

The status of the option can be checked with `getIncludeDefaultCustomVariables`:
```js
const includeDefaultCustomVariables = await PiwikProSdk.getIncludeDefaultCustomVariables();
```
Returns:
- `includeDefaultCustomVariables: boolean` - flag that determines whether default custom variables should be added to each tracking event.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
