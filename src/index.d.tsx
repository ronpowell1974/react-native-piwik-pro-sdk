type PiwikProSdkType = {
  /**
   * Initializes Piwik Pro SDK. It's recommended to initialize
   * Piwik PRO SDK only once for the entire application.
   * @apiUrl URL of your Piwik PRO server
   * @siteId ID of application you want to track
   */
  init(apiUrl: string, siteId: string): Promise<void>;

  /**
   * Set anonymization state of Piwik Pro SDK
   */
  trackScreen(
    path: string,
    title?: string,
    customDimensions?: CustomDimensions,
    visitCustomVariables?: CustomVariables,
    screenCustomVariables?: CustomVariables
  ): Promise<void>;

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
