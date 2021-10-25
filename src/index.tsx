import { NativeModules, Platform } from 'react-native';
import { validateInt, validateCustomDimensions } from './util/validator';

const LINKING_ERROR =
  `The package 'react-native-piwik-pro-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PiwikProNativeSdk = NativeModules.PiwikProSdk
  ? NativeModules.PiwikProSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

async function init(apiUrl: string, siteId: string): Promise<void> {
  return await PiwikProNativeSdk.init(apiUrl, siteId);
}

async function trackScreen(
  path: string,
  title?: string,
  customDimensions?: CustomDimensions
): Promise<void> {
  validateCustomDimensions(customDimensions);
  return await PiwikProNativeSdk.trackScreen(path, title, customDimensions);
}

async function dispatch(): Promise<void> {
  return await PiwikProNativeSdk.dispatch();
}

async function setDispatchInterval(dispatchInterval: number): Promise<void> {
  validateInt(dispatchInterval);
  return await PiwikProNativeSdk.setDispatchInterval(dispatchInterval);
}

async function getDispatchInterval(): Promise<number> {
  return await PiwikProNativeSdk.getDispatchInterval();
}

const PiwikProSdk: PiwikProSdkType = {
  init,
  trackScreen,
  dispatch,
  setDispatchInterval,
  getDispatchInterval,
};

export default PiwikProSdk;
