import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-piwik-pro-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type PiwikProSdkType = {
  /**
   * Initialize Piwik Pro SDK
   */
  init(apiUrl: string, siteId: string): Promise<void>;

  /**
   * Set anonymization state of Piwik Pro SDK
   */
  trackScreen(
    path: string,
    title?: string,
    customDimensions?: CustomDimensions
  ): Promise<void>;

  /**
   * Dispatch queued events
   */
  dispatch(): Promise<void>;

  setDispatchInterval(dispatchInterval: number): Promise<void>;
};

type CustomDimensions = {
  [index: number]: string;
};

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

/**
 * Initialize Piwik Pro SDK
 */
async function init(apiUrl: string, siteId: string): Promise<void> {
  return await PiwikProNativeSdk.init(apiUrl, siteId);
}

/**
 * Set anonymization state of Piwik Pro SDK
 */
async function trackScreen(
  path: string,
  title?: string,
  customDimensions?: CustomDimensions
): Promise<void> {
  return await PiwikProNativeSdk.trackScreen(path, title, customDimensions);
}

async function dispatch(): Promise<void> {
  return await PiwikProNativeSdk.dispatch();
}

async function setDispatchInterval(dispatchInterval: number): Promise<void> {
  return await PiwikProNativeSdk.setDispatchInterval(dispatchInterval);
}

const PiwikProSdk: PiwikProSdkType = {
  init,
  trackScreen,
  dispatch,
  setDispatchInterval,
};

export default PiwikProSdk;
