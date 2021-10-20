type PiwikProSdkType = {
  /**
   * Initialize Piwik Pro SDK. It's recommended to initialize
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
    customDimensions?: CustomDimensions
  ): Promise<void>;

  /**
   * Dispatch queued events
   */
  dispatch(): Promise<void>;

  setDispatchInterval(dispatchInterval: number): Promise<void>;
};

type CustomDimensions = {
  [index: number]: string;
};
