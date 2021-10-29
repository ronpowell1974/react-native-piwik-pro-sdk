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
- `anonymizationState: boolean` *(required)* - new anonymization state.

You can also check the anonymization status using the `isAnonymizationOn` method:

```js
const anonymizationState = await PiwikProSdk.isAnonymizationOn();
```
Returns:
- `anonymizationState: boolean` - current anonymization state.


## Tracking screen views

During a valid tracking session, you can track screen views which represent the content the user is viewing in the application. To track a screen you only need to provide the screen path. This path is internally translated by the SDK to an HTTP URL as the Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in a generated URL for various types of action(s). For tracking screen views it will use a prefix `'screen'` by default, however, automatic prefixing can be disabled with the
TODO `tracker.setPrefixing(false)` option.

```js
const options = {
  title: 'actionTitle',
  customDimensions: { 1: 'some custom dimension value' },
};
await PiwikProSdk.trackScreen(`your_screen_path`, options);
```
Parameters:
- `path: string` *(required)* - screen path (it will be mapped to the URL path).
- `options` - screen tracking options, object containing four properties (all of them are optional):
  - `title: string` - the title of the action being tracked (it will be omitted in iOS application).
  - `customDimensions` - the object specifying [custom dimensions](#tracking-custom-dimensions).
  - `screenCustomVariables` - the object specifying [screen custom variables](#tracking-custom-variables).
  - `visitCustomVariables` - the object specifying [visit custom variables](#tracking-custom-variables).


## Tracking custom events

To collect data about the user’s interaction with the interactive components of the application, like a button presses or the use of a particular item in the game - use event method.

```js
const options = {
  name: 'customEvent',
  path: 'some/path',
  value: 1.5,
  customDimensions: { 1: 'some custom dimension value' },
}
await PiwikProSdk.trackCustomEvent(`custom_event`, 'custom_event_action', options);
```
Parameters:
- `category: string` *(required)* - event category. You may define event categories based on the class of user actions (e.g. clicks, gestures, voice commands), or you may define them based on the features available in your application (e.g. play, pause, fast forward, etc.).
- `action: string` *(required)* - specific event action within the category specified. In the example, we are effectively saying that the category of the event is user clicks, and the action is a button click.
- `options` - custom event options, object containing five properties (all of them are optional):
  - `name: string` - label associated with the event. For example, if you have multiple button controls on a screen, you may use the label to specify the specific view control identifier that was clicked.
  - `value: number` - float, numerical value associated with the event. For example, if you were tracking 'Buy' button clicks, you may log the number of items being purchased or their total cost.
  - `path: string` - the path under which this event occurred (it will be omitted in iOS application).
  - `customDimensions` - the object specifying [custom dimensions](#tracking-custom-dimensions).
  - `visitCustomVariables` - the object specifying [visit custom variables](#tracking-custom-variables).


For more resources, please visit [documentation](https://help.piwik.pro/support/tag-manager/piwik-pro-custom-event/).


## Tracking exceptions

Caught exceptions are errors in your app for which you’ve defined an exception handling code, such as the occasional timeout of a network connection during a request for data. Exceptions are tracked on the server in a similar way as screen views, however, action internally generated for exceptions always uses the `'fatal'` or `'caught'` prefix, and additionally the `'exception'` prefix if `tracker.isPrefixing() //TODO` option is enabled(true).

Measure a caught exception by setting the exception field values on the tracker and sending the hit, as with this example:

```js
const options = {
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  customDimensions: { 1: 'some custom dimension value' },
};
await PiwikProSdk.trackException('exception', false, options);
```
Parameters:
- `description: string` *(required)* - the exception message.
- `isFatal: boolean` *(required)* - true if an exception is fatal. Determines whether the exception prefix will be `'fatal'` or `'caught'`.
- `options` - exception tracking options, object containing two properties (all of them are optional):
  - `customDimensions` - the object specifying [custom dimensions](#tracking-custom-dimensions).
  - `visitCustomVariables` - the object specifying [visit custom variables](#tracking-custom-variables).



## Tracking social interactions

Social interactions such as likes, shares and comments in various social networks can be tracked as below. This, again, is tracked in a similar way as with screen views but the `'social'` prefix is used when the default `tracker.isPrefixing() //TODO` option is enabled.

```js
const options = {
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  target: 'Photo',
};
await PiwikProSdk.trackSocialInteraction(`Like`, 'Facebook', options);
```
Parameters:
- `interaction: string` *(required)* - the social interaction, e.g. 'Like'.
- `network: string` *(required)* - social network associated with interaction, e.g. 'Facebook'.
- `options` - exception tracking options, object containing three properties (all of them are optional):
  - `target: string` - the target for which this interaction occurred, e.g. 'Photo'.
  - `customDimensions` - the object specifying [custom dimensions](#tracking-custom-dimensions).
  - `visitCustomVariables` - the object specifying [visit custom variables](#tracking-custom-variables).

The generated URL corresponds to string, which includes the network, interaction and target parameters separated by slash.



## Tracking custom variables

A [Custom Variable](https://piwik.pro/glossary/custom-variables/) is a custom name-value pair that you can assign to your users or screen views, and then visualize the reports of how many visits, conversions, etc. for each custom variable. A custom variable is defined by a name - for example, 'User status' - and a value - for example, 'LoggedIn' or 'Anonymous'. It is required for names and values to be encoded in UTF-8.

Each custom variable has a scope. There are two types of custom variables scope - visit scope and screen scope. The visit scope can be used for any tracking action, and the screen scope can only be applied to tracking screen views.

To set the custom variable of the screen scope, use the `screenCustomVariables` object, for the visit scope - `visitCustomVariables` in the screen tracking method options:

```js
const options = {
  screenCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  visitCustomVariables: { 5: { name: 'drink', value: 'water' } },
};
await PiwikProSdk.trackScreen(`your_screen_path`, options);
```

Please note that for the [Default custom variables](#default-custom-variables) option, use the custom variables of the visit scope with indexes 1-3.
Custom Variables is the object with the following format:
```js
const customVariables = {
  4: { name: 'food', value: 'pizza' },
  5: { name: 'drink', value: 'water' },
}
```
where:
- `index: number`, the key *(required)* - a given custom variable name must always be stored in the same 'index' per session. For example, if you choose to store the variable with name 'Gender' in index  `1` and you record another custom variable in index `1`, then the 'Gender' variable will be deleted and replaced with a new custom variable stored in index `1`.
- `name: string` *(required)* - the name of a specific custom variable such as 'User type' (Limited to 200 characters).
- `value: string` *(required)* - the value of a specific custom variable such as 'Customer' (Limited to 200 characters).


## Tracking custom dimensions

To track a custom name-value pair assigned to your users or screen views, use [Custom Dimensions](https://help.piwik.pro/support/analytics/custom-dimension/). Note that the custom value data is not sent by itself, but only with other tracking actions such as screen views, events or other tracking actions (see the documentation of other tracking methods), for example:

```js
const customDimensions = {
  1: 'dashboard',
  2: 'menu',
}
await PiwikProSdk.trackScreen(`your_screen_path`, { customDimensions });
```

`1` and `2` are dimension IDs. `dashboard`, `menu` are the dimension values for the tracked screen view event.


## Dispatching

Tracked events are stored temporarily on the queue and dispatched in batches every 30 seconds (default setting). This behavior can be changed in the following way:

```js
const dispatchInterval = 25; // 25 seconds
await PiwikProSdk.setDispatchInterval(dispatchInterval);    
```

Parameters:
- `dispatchInterval: number` *(required)* - new dispatch interval (in seconds).

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
- `includeDefaultCustomVariables: boolean` *(required)* - flag that determines whether default custom variables should be added to each tracking event.

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
