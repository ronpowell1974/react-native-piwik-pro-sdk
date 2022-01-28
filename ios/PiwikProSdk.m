#import "PiwikProSdk.h"
#import <PiwikPROSDK/PiwikPROSDK.h>

@implementation PiwikProSdk

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(init,
                 initWithBaseURL:(nonnull NSString*)baseURL
                 withSiteID:(nonnull NSString*)siteID
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] != nil) {
        reject(@"already_initialized", @"Piwik Pro SDK has been already initialized", nil);
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        PiwikTracker* tracker = [PiwikTracker sharedInstanceWithSiteID:siteID baseURL:[NSURL URLWithString:baseURL]];
        NSBundle* bundle = [NSBundle mainBundle];
        
        tracker.appName = [bundle bundleIdentifier];
        resolve(nil);
    });
}

RCT_REMAP_METHOD(trackScreen,
                 trackScreenWithPath:(nonnull NSString*)path
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        [self applyScreenCustomVariables:options[@"screenCustomVariables"]];
        
        [[PiwikTracker sharedInstance] sendView:path];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackCustomEvent,
                 trackCustomEventWithCategory:(nonnull NSString*)category
                 withAction:(nonnull NSString*)action
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendEventWithCategory:category action:action name:options[@"name"] value:options[@"value"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackException,
                 trackExceptionWithDescription:(nonnull NSString*)description
                 withIsFatal:(BOOL)isFatal
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendExceptionWithDescription:description isFatal:isFatal];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackSocialInteraction,
                 trackSocialInteractionWithInteraction:(nonnull NSString*)interaction
                 withNetwork:(nonnull NSString*)network
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendSocialInteractionWithAction:interaction target:options[@"target"] network:network];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackDownload,
                 trackDownloadWithUrl:(nonnull NSString*)url
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendDownload:url];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackOutlink,
                 trackOutlinkWithOutlink:(nonnull NSString*)outlink
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendOutlink:outlink];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackSearch,
                 trackSearchWithKeyword:(nonnull NSString*)keyword
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendSearchWithKeyword:keyword category:options[@"category"] numberOfHits:options[@"count"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackImpression,
                 trackImpressionWithContentName:(nonnull NSString*)contentName
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];
        
        [[PiwikTracker sharedInstance] sendContentImpressionWithName:contentName piece:options[@"piece"] target:options[@"target"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackGoal,
                 trackGoalWithGoal:(nonnull NSNumber*)goal
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];

        [[PiwikTracker sharedInstance] sendGoalWithID:[goal intValue] revenue:options[@"revenue"]];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(trackCampaign,
                 trackCampaignWithUrl:(nonnull NSString*)url
                 withOptions:(NSDictionary*)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [self applyOptionalParameters:options];

        [[PiwikTracker sharedInstance] sendCampaign:url];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getProfileAttributes,
                 getProfileAttributesWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] audienceManagerGetProfileAttributes:^(NSDictionary *profileAttributes, NSError * _Nullable error) {
            if(error != nil) {
                reject(@"error", @"Getting user profile attributes failed", error);
                return;
            }
            
            resolve(profileAttributes);
        }];
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(checkAudienceMembership,
                 checkAudienceMembershipWithAudienceId:(nonnull NSString*)audienceId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }

    @try {
        [[PiwikTracker sharedInstance] checkMembershipWithAudienceID:audienceId completionBlock:^(BOOL isMember, NSError * _Nullable error) {
            if(error != nil) {
                reject(@"error", @"Checking audience membership failed", error);
                return;
            }

            resolve(@(isMember));
        }];
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(dispatch,
                 dispatchWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] dispatch];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setDispatchInterval,
                 setDispatchIntervalWithDispatchInterval:(double)dispatchInterval
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [[PiwikTracker sharedInstance] setDispatchInterval:dispatchInterval];
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getDispatchInterval,
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        double dispatchInterval = [PiwikTracker sharedInstance].dispatchInterval;
        resolve(@(dispatchInterval));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setIncludeDefaultCustomVariables,
                 withIncludeDefaultCustomVariables:(BOOL)includeDefaultCustomVariables
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].includeDefaultCustomVariable = includeDefaultCustomVariables;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getIncludeDefaultCustomVariables,
                 getIncludeDefaultCustomVariablesWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL includeDefaultCustomVariables = [PiwikTracker sharedInstance].includeDefaultCustomVariable;
        resolve(@(includeDefaultCustomVariables));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setAnonymizationState,
                 withAnonymizationState:(BOOL)anonymizationState
                 getDispatchIntervalWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].isAnonymizationEnabled = anonymizationState;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(isAnonymizationOn,
                 isAnonymizationOnWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL anonymizationState = [PiwikTracker sharedInstance].isAnonymizationEnabled;
        resolve(@(anonymizationState));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setOptOut,
                 setOptOutWithOptOut:(BOOL)optOut
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].optOut = optOut;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(getOptOut,
                 getOptOutWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL optOut = [PiwikTracker sharedInstance].optOut;
        resolve(@(optOut));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(setPrefixing,
                 setPrefixingWithAnonymizationState:(BOOL)prefixingEnabled
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        [PiwikTracker sharedInstance].isPrefixingEnabled = prefixingEnabled;
        resolve(nil);
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

RCT_REMAP_METHOD(isPrefixingOn,
                 isPrefixingOnWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    if ([PiwikTracker sharedInstance] == nil) {
        reject(@"not_initialized", @"Piwik Pro SDK has not been initialized", nil);
        return;
    }
    
    @try {
        BOOL prefixingEnabled = [PiwikTracker sharedInstance].isPrefixingEnabled;
        resolve(@(prefixingEnabled));
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (void)applyCustomDimensions:(nullable NSDictionary*)customDimensions {
    if (customDimensions == nil) {
        return;
    }
    
    for (NSString* key in customDimensions) {
        [[PiwikTracker sharedInstance] setCustomDimensionForIndex:[key intValue] value:customDimensions[key] scope:CustomDimensionScopeAction];
    }
}

- (void)applyVisitCustomVariables:(nullable NSDictionary*)customVariables {
    if (customVariables == nil) {
        return;
    }
    
    for (NSString* key in customVariables) {
        NSDictionary* valuesDict = customVariables[key];
        [[PiwikTracker sharedInstance] setCustomVariableForIndex:[key intValue] name:valuesDict[@"name"] value:valuesDict[@"value"] scope:CustomVariableScopeVisit];
    }
}

- (void)applyScreenCustomVariables:(nullable NSDictionary*)customVariables {
    if (customVariables == nil) {
        return;
    }
    
    for (NSString* key in customVariables) {
        NSDictionary* valuesDict = customVariables[key];
        [[PiwikTracker sharedInstance] setCustomVariableForIndex:[key intValue] name:valuesDict[@"name"] value:valuesDict[@"value"] scope:CustomVariableScopeAction];
    }
}

- (void)applyOptionalParameters:(NSDictionary*)options {
    [self applyCustomDimensions:options[@"customDimensions"]];
    [self applyVisitCustomVariables:options[@"visitCustomVariables"]];
}

@end
