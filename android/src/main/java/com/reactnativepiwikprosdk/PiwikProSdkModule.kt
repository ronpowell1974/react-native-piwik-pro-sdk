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

  @ReactMethod
  fun init(apiUrl: String, siteId: String, promise: Promise) {
    if (this.tracker != null) {
      promise.reject(Error("Piwik Pro SDK has been already initialized"))
      return
    }

    try {
      val tracker = Piwik.getInstance(this.reactApplicationContext).newTracker(
        TrackerConfig.createDefault(
          apiUrl, siteId
        )
      )

      this.tracker = tracker
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackScreen(path: String, title: String?, customDimensions: ReadableMap?, visitCustomVariables: ReadableMap?, screenCustomVariables: ReadableMap?, promise: Promise) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()
      val screen = trackHelper.screen(path).title(title)

      applyCustomDimensions(trackHelper, customDimensions)
      applyVisitCustomVariables(trackHelper, visitCustomVariables)
      applyScreenCustomVariables(screen, screenCustomVariables)
      screen.with(tracker)

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
      getTracker().setDispatchInterval(dispatchInterval.toLong() * 1000)
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getDispatchInterval(promise: Promise) {
    try {
      val dispatchInterval = getTracker().dispatchInterval.toInt() / 1000
      promise.resolve(dispatchInterval)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setIncludeDefaultCustomVariables(includeDefaultCustomVariables: Boolean, promise: Promise) {
    try {
      getTracker().setIncludeDefaultCustomVars(includeDefaultCustomVariables);
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getIncludeDefaultCustomVariables(promise: Promise) {
    try {
      val includeDefaultCustomVariables = getTracker().includeDefaultCustomVars
      promise.resolve(includeDefaultCustomVariables)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  private fun getTracker(): Tracker {
    return this.tracker ?: throw Exception("Piwik Pro SDK has not been initialized")
  }

  private fun applyCustomDimensions(trackHelper: TrackHelper, customDimensions: ReadableMap?) {
    customDimensions?.entryIterator?.forEach {
      trackHelper.dimension(it.key.toInt(), it.value.toString())
    }
  }

  private fun applyVisitCustomVariables(trackHelper: TrackHelper, customVariables: ReadableMap?) {
    customVariables?.entryIterator?.forEach {
      val key = it.key.toInt();
      val valuesMap: ReadableMap = it.value as ReadableMap
      val name = valuesMap.getString("name")
      val value = valuesMap.getString("value")

      trackHelper.visitVariables(key, name, value)
    }
  }

  private fun applyScreenCustomVariables(screen: TrackHelper.Screen, customVariables: ReadableMap?) {
    customVariables?.entryIterator?.forEach {
      val key = it.key.toInt();
      val valuesMap: ReadableMap = it.value as ReadableMap
      val name = valuesMap.getString("name")
      val value = valuesMap.getString("value")

      screen.variable(key, name, value)
    }
  }
}
