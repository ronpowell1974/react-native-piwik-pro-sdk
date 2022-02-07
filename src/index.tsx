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
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackScreen(path, options);
}

async function trackCustomEvent(
  category: string,
  action: string,
  options?: TrackCustomEventOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackCustomEvent(category, action, options);
}

async function trackException(
  description: string,
  isFatal: boolean,
  options?: CommonEventOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackException(description, isFatal, options);
}

async function trackSocialInteraction(
  interaction: string,
  network: string,
  options?: TrackSocialInteractionOptions
): Promise<void> {
  validateCustomKeyValues(options);
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
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackDownload(url, options);
}

async function trackOutlink(
  url: string,
  options?: CommonEventOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackOutlink(url, options);
}

async function trackSearch(
  keyword: string,
  options?: TrackScreenOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackSearch(keyword, options);
}

async function trackImpression(
  contentName: string,
  options?: TrackImpressionOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackImpression(contentName, options);
}

async function trackGoal(
  goal: number,
  options?: TrackGoalOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackGoal(goal, options);
}

async function trackEcommerce(
  orderId: string,
  grandTotal: number,
  options?: TrackEcommerceOptions
): Promise<void> {
  return await PiwikProNativeSdk.trackEcommerce(orderId, grandTotal, options);
}

async function trackCampaign(
  url: string,
  options?: CommonEventOptions
): Promise<void> {
  validateCustomKeyValues(options);
  return await PiwikProNativeSdk.trackCampaign(url, options);
}

async function trackProfileAttributes(
  profileAttributes: TrackProfileAttributes
): Promise<void> {
  if (Array.isArray(profileAttributes)) {
    if (!profileAttributes.length) {
      throw new Error('Profile attributes cannot be an empty array');
    }

    return await PiwikProNativeSdk.trackProfileAttributes(profileAttributes);
  }

  return await PiwikProNativeSdk.trackProfileAttributes([profileAttributes]);
}

async function getProfileAttributes(): Promise<ProfileAttributes> {
  return await PiwikProNativeSdk.getProfileAttributes();
}

async function checkAudienceMembership(audienceId: string): Promise<boolean> {
  return await PiwikProNativeSdk.checkAudienceMembership(audienceId);
}

async function setUserId(userId: string): Promise<void> {
  return await PiwikProNativeSdk.setUserId(userId);
}

async function getUserId(): Promise<string> {
  return await PiwikProNativeSdk.getUserId();
}

async function setUserEmail(email: string): Promise<void> {
  return await PiwikProNativeSdk.setUserEmail(email);
}

async function getUserEmail(): Promise<string> {
  return await PiwikProNativeSdk.getUserEmail();
}

async function setSessionTimeout(sessionTimeout: number): Promise<void> {
  return await PiwikProNativeSdk.setSessionTimeout(sessionTimeout);
}

async function getSessionTimeout(): Promise<number> {
  return await PiwikProNativeSdk.getSessionTimeout();
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

async function setOptOut(optOut: boolean): Promise<void> {
  return await PiwikProNativeSdk.setOptOut(optOut);
}

async function getOptOut(): Promise<boolean> {
  return await PiwikProNativeSdk.getOptOut();
}

async function setPrefixing(prefixingEnabled: boolean): Promise<void> {
  return await PiwikProNativeSdk.setPrefixing(prefixingEnabled);
}

async function isPrefixingOn(): Promise<boolean> {
  return await PiwikProNativeSdk.isPrefixingOn();
}

function validateCustomKeyValues(options: any) {
  validateCustomKeyValue(options?.customDimensions);
  validateCustomKeyValue(options?.visitCustomVariables);
  validateCustomKeyValue(options?.screenCustomVariables);
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
  trackEcommerce,
  trackCampaign,
  trackProfileAttributes,
  getProfileAttributes,
  checkAudienceMembership,
  setUserId,
  getUserId,
  setUserEmail,
  getUserEmail,
  setSessionTimeout,
  getSessionTimeout,
  dispatch,
  setDispatchInterval,
  getDispatchInterval,
  setIncludeDefaultCustomVariables,
  getIncludeDefaultCustomVariables,
  setAnonymizationState,
  isAnonymizationOn,
  setOptOut,
  getOptOut,
  setPrefixing,
  isPrefixingOn,
};

export default PiwikProSdk;
