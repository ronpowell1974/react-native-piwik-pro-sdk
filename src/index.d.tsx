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
    options?: TrackExceptionOptions
  ): Promise<void>;

  /**
   * Tracks social interaction.
   * @interaction defines the social interaction
   * @network social network associated with interaction
   * @options exception tracking options (target, customDimensions, visitCustomVariables)
   */
  trackSocialInteraction(
    interaction: string,
    network: string,
    options?: TrackSocialInteractionOptions
  ): Promise<void>;

  /**
   * Tracks download.
   */
  trackDownload(url: string, options?: CommonEventOptions): Promise<void>;

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

type TrackExceptionOptions = CommonEventOptions;

type TrackSocialInteractionOptions = CommonEventOptions & {
  target?: string;
};
