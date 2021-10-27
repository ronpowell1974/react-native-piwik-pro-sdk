import { NativeModules, Platform } from 'react-native';
import { validateInt, validateCustomKeyValue } from './util/validator';

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
  customDimensions?: CustomDimensions,
  visitCustomVariables?: CustomVariables,
  screenCustomVariables?: CustomVariables
): Promise<void> {
  validateCustomKeyValue(customDimensions);
  validateCustomKeyValue(visitCustomVariables);
  validateCustomKeyValue(screenCustomVariables);

  return await PiwikProNativeSdk.trackScreen(
    path,
    title,
    customDimensions,
    visitCustomVariables,
    screenCustomVariables
  );
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

async function setIncludeDefaultCustomVariables(
  includeDefaultCustomVariables: boolean
): Promise<void> {
  return await PiwikProNativeSdk.setIncludeDefaultCustomVariables(
    includeDefaultCustomVariables
  );
}

async function getIncludeDefaultCustomVariables(): Promise<boolean> {
  return await PiwikProNativeSdk.getIncludeDefaultCustomVariables();
}

async function setAnonymizationState(
  anonymizationState: boolean
): Promise<void> {
  return await PiwikProNativeSdk.setAnonymizationState(anonymizationState);
}

async function isAnonymizationOn(): Promise<boolean> {
  return await PiwikProNativeSdk.isAnonymizationOn();
}

const PiwikProSdk: PiwikProSdkType = {
  init,
  trackScreen,
  dispatch,
  setDispatchInterval,
  getDispatchInterval,
  setIncludeDefaultCustomVariables,
  getIncludeDefaultCustomVariables,
  setAnonymizationState,
  isAnonymizationOn,
};

export default PiwikProSdk;
