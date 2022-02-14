package com.reactnativepiwikprosdk

import android.text.TextUtils
import com.facebook.react.bridge.*
import pro.piwik.sdk.Piwik
import pro.piwik.sdk.Tracker
import pro.piwik.sdk.Tracker.OnCheckAudienceMembership
import pro.piwik.sdk.Tracker.OnGetProfileAttributes
import pro.piwik.sdk.TrackerConfig
import pro.piwik.sdk.extra.DownloadTracker
import pro.piwik.sdk.extra.DownloadTracker.Extra
import pro.piwik.sdk.extra.DownloadTracker.Extra.Custom
import pro.piwik.sdk.extra.EcommerceItems
import pro.piwik.sdk.extra.TrackHelper
import java.net.URL
import java.util.*

const val TRAFFIC_SOURCE_NAME = "react_native"

class PiwikProSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var tracker: Tracker? = null

  override fun getName(): String {
    return "PiwikProSdk"
  }

  @ReactMethod
  fun init(apiUrl: String, siteId: String, version: String, promise: Promise) {
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

      tracker.trafficSourceName = TRAFFIC_SOURCE_NAME
      tracker.trafficSourceVersion = version
      this.tracker = tracker
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackScreen(path: String, options: ReadableMap?, promise: Promise) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()
      val screen = trackHelper.screen(path).title(options?.getString("title"))

      applyOptionalParameters(trackHelper, options)
      applyScreenCustomVariables(screen, options?.getMap("screenCustomVariables"))
      screen.with(tracker)

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackCustomEvent(category: String, action: String, options: ReadableMap?, promise: Promise) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()
      val customEventTracker = trackHelper.event(category, action).path(options?.getString("path"))
        .name(options?.getString("name")).value(
          options?.getDouble("value")?.toFloat()
        )

      applyOptionalParameters(trackHelper, options)
      customEventTracker.with(tracker)

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackException(
    description: String,
    isFatal: Boolean,
    options: ReadableMap?,
    promise: Promise
  ) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()
      val exceptionTracker =
        trackHelper.exception(Exception(description)).description(description).fatal(isFatal)

      applyOptionalParameters(trackHelper, options)
      exceptionTracker.with(tracker)

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackSocialInteraction(
    interaction: String,
    network: String,
    options: ReadableMap?,
    promise: Promise
  ) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.socialInteraction(interaction, network).target(options?.getString("target"))
        .with(tracker)

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackDownload(url: String, options: ReadableMap?, promise: Promise) {
    try {
      val tracker = getTracker()
      val trackHelper = TrackHelper.track()
      val extra: Extra = object : Custom() {
        override fun isIntensiveWork(): Boolean {
          return false
        }

        override fun buildExtraIdentifier(): String? {
          return url
        }
      }

      applyOptionalParameters(trackHelper, options)
      trackHelper.download(DownloadTracker(tracker)).identifier(extra).force().with(tracker)
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackOutlink(url: String, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.outlink(URL(url)).with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackSearch(keyword: String, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()
      val search = trackHelper.search(keyword).category(options?.getString("category"))

      applyOptionalParameters(trackHelper, options)

      if (options?.hasKey("count") == true) {
        search.count(options.getInt("count"))
      }
      search.with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackImpression(contentName: String, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.impression(contentName).piece(options?.getString("piece"))
        .target(options?.getString("target")).with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackInteraction(contentName: String, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.interaction(contentName, "click").piece(options?.getString("piece"))
        .target(options?.getString("target")).with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackGoal(goal: Int, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.goal(goal).revenue(options?.getDouble("revenue")?.toFloat()).with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackEcommerce(orderId: String, grandTotal: Int, options: ReadableMap?, promise: Promise) {
    try {
      val items = buildEcommerceItems(options?.getArray("items"))
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper
        .order(orderId, grandTotal)
        .subTotal(options?.getInt("subTotal"))
        .tax(options?.getInt("tax"))
        .shipping(options?.getInt("shipping"))
        .discount(options?.getInt("discount"))
        .items(items)
        .with(getTracker())

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackCampaign(url: String, options: ReadableMap?, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()

      applyOptionalParameters(trackHelper, options)
      trackHelper.campaign(URL(url)).with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun trackProfileAttributes(profileAttributes: ReadableArray, promise: Promise) {
    try {
      val trackHelper = TrackHelper.track()
      val firstAttribute = profileAttributes.getMap(0) as ReadableMap
      val profileAttributesEvent = trackHelper.audienceManagerSetProfileAttribute(
        firstAttribute.getString("name").toString(),
        firstAttribute.getString("value").toString()
      )

      for (i in 1 until profileAttributes.size()) {
        val attribute = profileAttributes.getMap(i) as ReadableMap

        profileAttributesEvent.add(
          attribute.getString("name").toString(),
          attribute.getString("value").toString()
        )
      }

      profileAttributesEvent.with(getTracker())
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getProfileAttributes(promise: Promise) {
    try {
      getTracker().audienceManagerGetProfileAttributes(object : OnGetProfileAttributes {
        override fun onAttributesReceived(attributes: Map<String, String>) {
          promise.resolve(convertMapToWritableMap(attributes))
        }

        override fun onError(errorData: String) {
          var errorData: String? = errorData
          errorData =
            if (TextUtils.isEmpty(errorData)) "Getting user profile attributes failed" else errorData
          promise.reject(Exception(errorData))
        }
      })
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun checkAudienceMembership(audienceId: String, promise: Promise) {
    try {
      getTracker().checkAudienceMembership(audienceId, object : OnCheckAudienceMembership {
        override fun onChecked(isMember: Boolean) {
          promise.resolve(isMember)
        }

        override fun onError(errorData: String) {
          promise.reject(Exception(errorData))
        }
      })
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setUserId(userId: String, promise: Promise) {
    try {
      getTracker().userId = userId
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getUserId(promise: Promise) {
    try {
      val userId = getTracker().userId
      promise.resolve(userId)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setUserEmail(email: String, promise: Promise) {
    try {
      getTracker().userMail = email
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getUserEmail(promise: Promise) {
    try {
      val email = getTracker().userMail
      promise.resolve(email)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setVisitorId(visitorId: String, promise: Promise) {
    try {
      getTracker().visitorId = visitorId
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getVisitorId(promise: Promise) {
    try {
      val visitorId = getTracker().visitorId
      promise.resolve(visitorId)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setSessionTimeout(timeout: Int, promise: Promise) {
    try {
      getTracker().setSessionTimeout(timeout * 1000)
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getSessionTimeout(promise: Promise) {
    try {
      val sessionTimeout = getTracker().sessionTimeout.toInt() / 1000
      promise.resolve(sessionTimeout)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun startNewSession(promise: Promise) {
    try {
      getTracker().startNewSession()
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
      getTracker().dispatchInterval = dispatchInterval.toLong() * 1000
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
      getTracker().includeDefaultCustomVars = includeDefaultCustomVariables
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

  @ReactMethod
  fun setAnonymizationState(anonymizationState: Boolean, promise: Promise) {
    try {
      getTracker().setAnonymizationState(anonymizationState)
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun isAnonymizationOn(promise: Promise) {
    try {
      val anonymizationState = getTracker().isAnonymizationOn
      promise.resolve(anonymizationState)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setOptOut(optOut: Boolean, promise: Promise) {
    try {
      getTracker().isOptOut = optOut
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setDryRun(dryRun: Boolean, promise: Promise) {
    try {
      if (dryRun) {
        getTracker().dryRunTarget = ArrayList()
      } else {
        getTracker().dryRunTarget = null
      }

      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getDryRun(promise: Promise) {
    try {
      val dryRunTarget = getTracker().dryRunTarget
      var dryRun = false

      if (dryRunTarget != null) {
        dryRun = true
      }

      promise.resolve(dryRun)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getOptOut(promise: Promise) {
    try {
      val optOut = getTracker().isOptOut
      promise.resolve(optOut)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun setPrefixing(prefixingEnabled: Boolean, promise: Promise) {
    try {
      getTracker().isPrefixing = prefixingEnabled
      promise.resolve(null)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun isPrefixingOn(promise: Promise) {
    try {
      val prefixingEnabled = getTracker().isPrefixing
      promise.resolve(prefixingEnabled)
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
      val key = it.key.toInt()
      val valuesMap: ReadableMap = it.value as ReadableMap
      val name = valuesMap.getString("name")
      val value = valuesMap.getString("value")

      trackHelper.visitVariables(key, name, value)
    }
  }

  private fun applyScreenCustomVariables(
    screen: TrackHelper.Screen,
    customVariables: ReadableMap?
  ) {
    customVariables?.entryIterator?.forEach {
      val key = it.key.toInt()
      val valuesMap: ReadableMap = it.value as ReadableMap
      val name = valuesMap.getString("name")
      val value = valuesMap.getString("value")

      screen.variable(key, name, value)
    }
  }

  private fun convertMapToWritableMap(map: Map<String, String>): WritableMap {
    val writableMap = WritableNativeMap()
    for ((key, value) in map.entries) {
      writableMap.putString(key, value)
    }

    return writableMap
  }

  private fun applyOptionalParameters(trackHelper: TrackHelper, options: ReadableMap?) {
    applyCustomDimensions(trackHelper, options?.getMap("customDimensions"))
    applyVisitCustomVariables(trackHelper, options?.getMap("visitCustomVariables"))
  }

  private fun buildEcommerceItems(
    itemsArray: ReadableArray?
  ): EcommerceItems {
    val items = EcommerceItems()

    if (itemsArray == null) {
      return items
    }

    for (i in 0 until itemsArray.size()) {
      val itemValues = itemsArray.getMap(i) as ReadableMap
      items.addItem(
        EcommerceItems.Item(itemValues.getString("sku")).name(itemValues.getString("name"))
          .category(itemValues.getString("category"))
          .price(itemValues.getInt("price")).quantity(itemValues.getInt("quantity"))
      )
    }

    return items
  }
}
