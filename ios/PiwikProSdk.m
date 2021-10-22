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
                 withPath:(nonnull NSString*)path
                 withTitle:(NSString*)title
                 withCustomDimensions:(NSDictionary*)customDimensions
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    // NSLog(path);
    // NSLog(title);
    if(customDimensions != nil) {
        NSLog(@"%@",customDimensions); 
    }
    // NSLog(path);
    // NSLog(customDimensions);
    [[PiwikTracker sharedInstance] sendView:path];
    resolve(nil);
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

@end
