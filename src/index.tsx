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
  options?: TrackScreenOptions
): Promise<void> {
  validateCustomKeyValue(options?.customDimensions);
  validateCustomKeyValue(options?.visitCustomVariables);
  validateCustomKeyValue(options?.screenCustomVariables);

  return await PiwikProNativeSdk.trackScreen(path, options);
}

async function trackCustomEvent(
  category: string,
  action: string,
  options?: TrackCustomEventOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackCustomEvent(category, action, options);
}

async function trackException(
  description: string,
  isFatal: boolean,
  options?: CommonEventOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackException(description, isFatal, options);
}

async function trackSocialInteraction(
  interaction: string,
  network: string,
  options?: TrackSocialInteractionOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackSocialInteraction(
    interaction,
    network,
    options
  );
}

async function trackDownload(
  url: string,
  options?: CommonEventOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackDownload(url, options);
}

async function trackOutlink(
  url: string,
  options?: CommonEventOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackOutlink(url, options);
}

async function trackSearch(
  keyword: string,
  options?: TrackScreenOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackSearch(keyword, options);
}

async function trackImpression(
  contentName: string,
  options?: TrackImpressionOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackImpression(contentName, options);
}

async function trackGoal(
  goal: number,
  options?: TrackGoalOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackGoal(goal, options);
}

async function trackCampaign(
  url: string,
  options?: CommonEventOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackCampaign(url, options);
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
  trackCustomEvent,
  trackException,
  trackSocialInteraction,
  trackDownload,
  trackOutlink,
  trackSearch,
  trackImpression,
  trackGoal,
  trackCampaign,
  dispatch,
  setDispatchInterval,
  getDispatchInterval,
  setIncludeDefaultCustomVariables,
  getIncludeDefaultCustomVariables,
  setAnonymizationState,
  isAnonymizationOn,
};

export default PiwikProSdk;
