type PiwikProSdkType = {
  /**
   * Initializes Piwik Pro SDK. It's recommended to initialize
   * Piwik PRO SDK only once for the entire application.
   * @apiUrl URL of your Piwik PRO server
   * @siteId ID of application you want to track
   */
  init(apiUrl: string, siteId: string): Promise<void>;

  /**
   * Sends tracking screen view event.
   * @path screen path
   * @options tracking screen options (title, customDimensions, screenCustomVariables, visitCustomVariables)
   */
  trackScreen(path: string, options?: TrackScreenOptions): Promise<void>;

  /**
   * Tracks custom event.
   * @category event category
   * @action specific event action within the category specified
   * @options custom event options (name, value, path, customDimensions, visitCustomVariables)
   */
  trackCustomEvent(
    category: string,
    action: string,
    options?: TrackCustomEventOptions
  ): Promise<void>;

  /**
   * Tracks exception.
   * @description the exception message
   * @isFatal determines whether the exception prefix will be `'fatal'` or `'caught'`
   * @options exception tracking options (customDimensions, visitCustomVariables)
   */
  trackException(
    description: string,
    isFatal: boolean,
    options?: CommonEventOptions
  ): Promise<void>;

  /**
   * Tracks social interaction.
   * @interaction defines the social interaction
   * @network social network associated with interaction
   * @options social interaction tracking options (target, customDimensions, visitCustomVariables)
   */
  trackSocialInteraction(
    interaction: string,
    network: string,
    options?: TrackSocialInteractionOptions
  ): Promise<void>;

  /**
   * Tracks download.
   * @url URL of the downloaded content
   * @options download tracking options (customDimensions, visitCustomVariables)
   */
  trackDownload(url: string, options?: CommonEventOptions): Promise<void>;

  /**
   * Tracks outlink.
   * @url outlink target
   * @options outlink tracking options (customDimensions, visitCustomVariables)
   */
  trackOutlink(url: string, options?: CommonEventOptions): Promise<void>;

  /**
   * Tracks search.
   * @keyword searched query that was used in the app
   * @options search tracking options (category, count, customDimensions, visitCustomVariables)
   */
  trackSearch(keyword: string, options?: TrackScreenOptions): Promise<void>;

  /**
   * Tracks impression.
   * @contentName name of the content
   * @options search tracking options (piece, target, customDimensions, visitCustomVariables)
   */
  trackImpression(
    contentName: string,
    options?: TrackImpressionOptions
  ): Promise<void>;

  /**
   * Tracks goal.
   * @goal tracking request will trigger a conversion for the goal of the website being tracked with given ID
   * @options goal tracking options (revenue, customDimensions, visitCustomVariables)
   */
  trackGoal(goal: number, options?: TrackGoalOptions): Promise<void>;

  /**
   * Tracks ecommerce transaction.
   * @contentName searched query that was used in the app
   * @options search tracking options (category, count, customDimensions, visitCustomVariables)
   */
  trackEcommerce(
    orderId: string,
    grandTotal: number,
    options?: TrackEcommerceOptions
  ): Promise<void>;

  /**
   * Tracks campaign.
   * @url campaign URL
   * @options campaign tracking options (customDimensions, visitCustomVariables)
   */
  trackCampaign(url: string, options?: CommonEventOptions): Promise<void>;

  /**
   * Tracks user profile attributes.
   * @profileAttributes profile attributes
   */
  trackProfileAttributes(
    profileAttributes: TrackProfileAttributes
  ): Promise<void>;

  /**
   * Returns user profile attributes.
   */
  getProfileAttributes(): Promise<ProfileAttributes>;

  /**
   * Checks whether user belongs to a specific group of users defined in the data manger. Returns `true` if user
   * belongs to the specified audience, `false` otherwise.
   * @param audienceId ID of the audience
   */
  checkAudienceMembership(audienceId: string): Promise<boolean>;

  /**
   * Sets the user ID
   * @param userId user ID to set
   */
  setUserId(userId: string): Promise<void>;

  /**
   * Returns the user ID
   */
  getUserId(): Promise<string>;

  /**
   * Sets the user's email
   * @param email non-null string representing email address
   */
  setUserEmail(email: string): Promise<void>;

  /**
   * Returns the user's email
   */
  getUserEmail(): Promise<string>;

  /**
   * Sets the session timeout.
   * @sessionTimeout new session timeout value (in seconds)
   */
  setSessionTimeout(sessionTimeout: number): Promise<void>;

  /**
   * Starts new session.
   */
  startNewSession(): Promise<void>;

  /**
   * Returns session timeout value (in seconds).
   */
  getSessionTimeout(): Promise<number>;

  /**
   * Dispatches queued events.
   */
  dispatch(): Promise<void>;

  /**
   * Sets dispatch interval (in seconds). If `dispatchInterval` value equals `0`
   * then events will be dispatched immediately. When its value is negative
   * then events will not be dispatched automatically.
   * @dispatchInterval new dispatch interval value (in seconds)
   */
  setDispatchInterval(dispatchInterval: number): Promise<void>;

  /**
   * Returns dispatch interval (in seconds) or negative number if automatic
   * dispatch has been disabled.
   */
  getDispatchInterval(): Promise<number>;

  /**
   * Sets flag that determines whether default custom variables should be
   * added to each tracking event.
   * @includeDefaultCustomVariable flag that determines whether to include default
   * custom variables
   */
  setIncludeDefaultCustomVariables(
    includeDefaultCustomVariables: boolean
  ): Promise<void>;

  /**
   * Returns the flag that determines whether default custom variables should be
   * added to each tracking event.
   */
  getIncludeDefaultCustomVariables(): Promise<boolean>;

  /**
   * Sets the new anonymization state.
   * @anonymizationState new anonymization state
   */
  setAnonymizationState(anonymizationState: boolean): Promise<void>;

  /**
   * Returns current anonymization state.
   */
  isAnonymizationOn(): Promise<boolean>;

  /**
   * Sets the new opt out state.
   * @optOut new opt out state
   */
  setOptOut(optOut: boolean): Promise<void>;

  /**
   * Returns current opt out state.
   */
  getOptOut(): Promise<boolean>;

  /**
   * Sets the new dry run state.
   * @dryRun new dry run state
   */
  setDryRun(dryRun: boolean): Promise<void>;

  /**
   * Returns current dry run state.
   */
  getDryRun(): Promise<boolean>;

  /**
   * Sets the new prefixing state.
   * @prefixingEnabled new prefixing state
   */
  setPrefixing(prefixingEnabled: boolean): Promise<void>;

  /**
   * Returns current prefixing state.
   */
  isPrefixingOn(): Promise<boolean>;
};

type CustomDimensions = {
  [index: number]: string;
};

type CustomVariable = {
  name: string;
  value: string;
};

type CustomVariables = {
  [index: number]: CustomVariable;
};

type CommonEventOptions = {
  customDimensions?: CustomDimensions;
  visitCustomVariables?: CustomVariables;
};

type TrackScreenOptions = CommonEventOptions & {
  title?: string;
  screenCustomVariables?: CustomVariables;
};

type TrackCustomEventOptions = CommonEventOptions & {
  name?: string;
  value?: number;
  path?: string;
};

type TrackSocialInteractionOptions = CommonEventOptions & {
  target?: string;
};

type TrackSearchOptions = CommonEventOptions & {
  category?: string;
  count?: number;
};

type TrackImpressionOptions = CommonEventOptions & {
  piece?: string;
  target?: string;
};

type TrackGoalOptions = CommonEventOptions & {
  revenue?: number;
};

type EcommerceItem = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type TrackEcommerceOptions = CommonEventOptions & {
  subTotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  items?: EcommerceItem[];
};

type ProfileAttributes = {
  [index: string]: string;
};

type TrackProfileAttribute = {
  name: string;
  value: string;
};

type TrackProfileAttributes = TrackProfileAttribute | TrackProfileAttribute[];
