package com.reactnativepiwikprosdk

import com.facebook.react.bridge.*
import pro.piwik.sdk.Piwik
import pro.piwik.sdk.Tracker
import pro.piwik.sdk.TrackerConfig
import pro.piwik.sdk.extra.TrackHelper


class PiwikProSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var tracker: Tracker? = null

  override fun getName(): String {
    return "PiwikProSdk"
  }

  // Initialize Piwik PRO SDK
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun init(apiUrl: String, siteId: String, promise: Promise) {
    if (this.tracker != null) {
      promise.reject(Error("Piwik Pro SDK has been already initialized"))
      return
    }

    try {
      this.tracker = Piwik.getInstance(this.reactApplicationContext).newTracker(
        TrackerConfig.createDefault(
          apiUrl, siteId
        )
      )

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackScreen(path: String, title: String?, customDimensions: ReadableMap?, promise: Promise) {
    try {
      val tracker = getTracker()
      var trackHelper = TrackHelper.track()

      customDimensions?.entryIterator?.forEach {
        trackHelper.dimension(it.key.toInt(), it.value.toString())
      }

      trackHelper.screen(path).title(title).with(tracker)
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun dispatch(promise: Promise) {
    try {
      getTracker().dispatch()
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setDispatchInterval(dispatchInterval: Int, promise: Promise) {
    try {
      getTracker().setDispatchInterval(dispatchInterval.toLong())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  private fun getTracker(): Tracker {
    return this.tracker ?: throw Exception("Piwik Pro SDK has not been initialized")
  }
}
