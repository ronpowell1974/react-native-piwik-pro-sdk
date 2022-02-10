import { NativeModules } from 'react-native';
import PiwikProSdk from '../';

jest.mock('react-native', () => ({
  NativeModules: {
    PiwikProSdk: {
      init: jest.fn(),
      trackScreen: jest.fn(),
      trackCustomEvent: jest.fn(),
      trackException: jest.fn(),
      trackSocialInteraction: jest.fn(),
      trackDownload: jest.fn(),
      trackOutlink: jest.fn(),
      trackSearch: jest.fn(),
      trackImpression: jest.fn(),
      trackGoal: jest.fn(),
      trackEcommerce: jest.fn(),
      trackCampaign: jest.fn(),
      trackProfileAttributes: jest.fn(),
      getProfileAttributes: jest.fn(),
      checkAudienceMembership: jest.fn(),
      setUserId: jest.fn(),
      getUserId: jest.fn(),
      setUserEmail: jest.fn(),
      getUserEmail: jest.fn(),
      setSessionTimeout: jest.fn(),
      getSessionTimeout: jest.fn(),
      startNewSession: jest.fn(),
      dispatch: jest.fn(),
      setDispatchInterval: jest.fn(),
      getDispatchInterval: jest.fn(),
      setIncludeDefaultCustomVariables: jest.fn(),
      getIncludeDefaultCustomVariables: jest.fn(),
      setAnonymizationState: jest.fn(),
      isAnonymizationOn: jest.fn(),
      setOptOut: jest.fn(),
      getOptOut: jest.fn(),
      setDryRun: jest.fn(),
      setPrefixing: jest.fn(),
      isPrefixingOn: jest.fn(),
    },
  },
  Platform: {
    select: jest.fn(),
  },
}));

const commonEventOptions: CommonEventOptions = {
  customDimensions: { 1: 'pizza' },
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
};

describe('PiwikProSdk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#init', () => {
    it('should call init from native SDK', async () => {
      const apiUrl = 'https://example.com';
      const siteId = '1111-2222-3333-dddd';

      await PiwikProSdk.init(apiUrl, siteId);

      expect(NativeModules.PiwikProSdk.init).toHaveBeenCalledWith(
        apiUrl,
        siteId
      );
    });
  });

  describe('#trackScreen', () => {
    it('should call trackScreen from native SDK', async () => {
      const path = 'sample/path';
      const options: TrackScreenOptions = {
        title: 'newAction',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackScreen(path, options);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        options
      );
    });

    it('should call trackScreen from native SDK when options are not passed', async () => {
      const path = 'sample/path';

      await PiwikProSdk.trackScreen(path);

      expect(NativeModules.PiwikProSdk.trackScreen).toHaveBeenCalledWith(
        path,
        undefined
      );
    });
  });

  describe('#trackCustomEvent', () => {
    it('should call trackCustomEvent from native SDK', async () => {
      const category = 'sample_category';
      const action = 'add';
      const options: TrackCustomEventOptions = {
        name: 'customEvent',
        path: 'some/path',
        ...commonEventOptions,
      };

      await PiwikProSdk.trackCustomEvent(category, action, options);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        options
      );
    });

    it('should call trackCustomEvent from native SDK when options are not passed', async () => {
      const category = 'sample_category';
      const action = 'add';

      await PiwikProSdk.trackCustomEvent(category, action);

      expect(NativeModules.PiwikProSdk.trackCustomEvent).toHaveBeenCalledWith(
        category,
        action,
        undefined
      );
    });
  });

  describe('#trackException', () => {
    it('should call trackException from native SDK', async () => {
      const description = 'sample exception';
      const isFatal = true;
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackException(description, isFatal, options);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        isFatal,
        options
      );
    });

    it('should call trackException from native SDK when options are not passed', async () => {
      const description = 'sample exception';
      const isFatal = true;

      await PiwikProSdk.trackException(description, isFatal);

      expect(NativeModules.PiwikProSdk.trackException).toHaveBeenCalledWith(
        description,
        isFatal,
        undefined
      );
    });
  });

  describe('#trackSocialInteraction', () => {
    it('should call trackSocialInteraction from native SDK', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';
      const options: TrackSocialInteractionOptions = {
        ...commonEventOptions,
        target: 'photo',
      };

      await PiwikProSdk.trackSocialInteraction(interaction, network, options);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, options);
    });

    it('should call trackSocialInteraction from native SDK when options are not passed', async () => {
      const interaction = 'sample exception';
      const network = 'facebook';

      await PiwikProSdk.trackSocialInteraction(interaction, network);

      expect(
        NativeModules.PiwikProSdk.trackSocialInteraction
      ).toHaveBeenCalledWith(interaction, network, undefined);
    });
  });

  describe('#trackDownload', () => {
    it('should call trackDownload from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackDownload(url, options);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('should call trackDownload from native SDK when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackDownload(url);

      expect(NativeModules.PiwikProSdk.trackDownload).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackOutlink', () => {
    it('should call trackOutlink from native SDK', async () => {
      const url = 'http://your.server.com/bonusmap.zip';
      const options: CommonEventOptions = commonEventOptions;

      await PiwikProSdk.trackOutlink(url, options);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('should call trackOutlink from native SDK when options are not passed', async () => {
      const url = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackOutlink(url);

      expect(NativeModules.PiwikProSdk.trackOutlink).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackSearch', () => {
    it('should call trackSearch from native SDK', async () => {
      const keyword = 'http://your.server.com/bonusmap.zip';
      const options: TrackSearchOptions = {
        ...commonEventOptions,
        count: 3,
        category: 'Movies',
      };

      await PiwikProSdk.trackSearch(keyword, options);

      expect(NativeModules.PiwikProSdk.trackSearch).toHaveBeenCalledWith(
        keyword,
        options
      );
    });

    it('should call trackSearch from native SDK when options are not passed', async () => {
      const keyword = 'http://your.server.com/bonusmap.zip';

      await PiwikProSdk.trackSearch(keyword);

      expect(NativeModules.PiwikProSdk.trackSearch).toHaveBeenCalledWith(
        keyword,
        undefined
      );
    });
  });

  describe('#trackImpression', () => {
    it('should call trackImpression from native SDK', async () => {
      const contentName = 'Some content impression';
      const options: TrackImpressionOptions = {
        ...commonEventOptions,
        piece: 'banner',
        target: 'https://www.dn.se/',
      };

      await PiwikProSdk.trackImpression(contentName, options);

      expect(NativeModules.PiwikProSdk.trackImpression).toHaveBeenCalledWith(
        contentName,
        options
      );
    });

    it('should call trackImpression from native SDK when options are not passed', async () => {
      const contentName = 'Some content impression';

      await PiwikProSdk.trackImpression(contentName);

      expect(NativeModules.PiwikProSdk.trackImpression).toHaveBeenCalledWith(
        contentName,
        undefined
      );
    });
  });

  describe('#trackGoal', () => {
    it('should call trackGoal from native SDK', async () => {
      const goal = 1;
      const options: TrackGoalOptions = {
        ...commonEventOptions,
        revenue: 3,
      };

      await PiwikProSdk.trackGoal(goal, options);

      expect(NativeModules.PiwikProSdk.trackGoal).toHaveBeenCalledWith(
        goal,
        options
      );
    });

    it('should call trackGoal from native SDK when options are not passed', async () => {
      const goal = 1;

      await PiwikProSdk.trackGoal(goal);

      expect(NativeModules.PiwikProSdk.trackGoal).toHaveBeenCalledWith(
        goal,
        undefined
      );
    });
  });

  describe('#trackEcommerce', () => {
    it('should call trackEcommerce from native SDK', async () => {
      const orderId = 'transaction';
      const grandTotal = 650;
      const options: TrackEcommerceOptions = {
        ...commonEventOptions,
        discount: 0,
        shipping: 222,
        subTotal: 500,
        tax: 20,
        items: [
          {
            sku: '0123456789012',
            category: "Men's T-shirts",
            name: 'Polo T-shirt',
            price: 3000,
            quantity: 2,
          },
        ],
      };

      await PiwikProSdk.trackEcommerce(orderId, grandTotal, options);

      expect(NativeModules.PiwikProSdk.trackEcommerce).toHaveBeenCalledWith(
        orderId,
        grandTotal,
        options
      );
    });
  });

  describe('#trackCampaign', () => {
    it('should call trackCampaign from native SDK', async () => {
      const url =
        'http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore';
      const options = commonEventOptions;

      await PiwikProSdk.trackCampaign(url, options);

      expect(NativeModules.PiwikProSdk.trackCampaign).toHaveBeenCalledWith(
        url,
        options
      );
    });

    it('should call trackCampaign from native SDK when options are not passed', async () => {
      const url =
        'http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore';

      await PiwikProSdk.trackCampaign(url);

      expect(NativeModules.PiwikProSdk.trackCampaign).toHaveBeenCalledWith(
        url,
        undefined
      );
    });
  });

  describe('#trackProfileAttributes', () => {
    it('should call trackProfileAttributes from native SDK properly when array is passed', async () => {
      const profileAttributes: TrackProfileAttributes = [
        { name: 'food', value: 'pizza' },
        { name: 'color', value: 'green' },
      ];

      await PiwikProSdk.trackProfileAttributes(profileAttributes);

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).toHaveBeenCalledWith(profileAttributes);
    });

    it('should call trackProfileAttributes from native SDK properly when single profile attribute is passed', async () => {
      const profileAttributes: TrackProfileAttributes = {
        name: 'food',
        value: 'pizza',
      };

      await PiwikProSdk.trackProfileAttributes(profileAttributes);

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).toHaveBeenCalledWith([profileAttributes]);
    });

    it('should throw an error when empty array is passed', async () => {
      const profileAttributes: TrackProfileAttributes = [];

      await expect(() =>
        PiwikProSdk.trackProfileAttributes(profileAttributes)
      ).rejects.toThrow(
        new Error('Profile attributes cannot be an empty array')
      );

      expect(
        NativeModules.PiwikProSdk.trackProfileAttributes
      ).not.toHaveBeenCalled();
    });
  });

  describe('#getProfileAttributes', () => {
    it('should call getProfileAttributes from native SDK and return attributes', async () => {
      const profileAttributes: ProfileAttributes = { device_type: 'desktop' };
      NativeModules.PiwikProSdk.getProfileAttributes.mockResolvedValue(
        profileAttributes
      );

      const result = await PiwikProSdk.getProfileAttributes();

      expect(result).toStrictEqual(profileAttributes);
      expect(NativeModules.PiwikProSdk.getProfileAttributes).toHaveBeenCalled();
    });
  });

  describe('#checkAudienceMembership', () => {
    it('should call checkAudienceMembership from native SDK and return status', async () => {
      const audienceId = 'audience123';
      const isMember = true;
      NativeModules.PiwikProSdk.checkAudienceMembership.mockResolvedValue(
        isMember
      );

      const result = await PiwikProSdk.checkAudienceMembership(audienceId);

      expect(result).toStrictEqual(isMember);
      expect(
        NativeModules.PiwikProSdk.checkAudienceMembership
      ).toHaveBeenCalledWith(audienceId);
    });
  });

  describe('#setUserId', () => {
    it('should call setUserId from native SDK', async () => {
      const userId = 'userId123';
      await PiwikProSdk.setUserId(userId);

      expect(NativeModules.PiwikProSdk.setUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('#getUserId', () => {
    it('should call getUserId from native SDK', async () => {
      const userId = 'user_id_5';
      NativeModules.PiwikProSdk.getUserId.mockResolvedValue(userId);
      const result = await PiwikProSdk.getUserId();

      expect(result).toStrictEqual(userId);
    });
  });

  describe('#setUserEmail', () => {
    it('should call setUserEmail from native SDK', async () => {
      const email = 'john@doe.com';
      await PiwikProSdk.setUserEmail(email);

      expect(NativeModules.PiwikProSdk.setUserEmail).toHaveBeenCalledWith(
        email
      );
    });
  });

  describe('#getUserEmail', () => {
    it('should call getUserEmail from native SDK', async () => {
      const userEmail = 'john@doe.com';
      NativeModules.PiwikProSdk.getUserEmail.mockResolvedValue(userEmail);
      const result = await PiwikProSdk.getUserEmail();

      expect(result).toStrictEqual(userEmail);
    });
  });

  describe('#setSessionTimeout', () => {
    it('should call setSessionTimeout from native SDK', async () => {
      const timeout = 1200;
      await PiwikProSdk.setSessionTimeout(timeout);

      expect(NativeModules.PiwikProSdk.setSessionTimeout).toHaveBeenCalledWith(
        timeout
      );
    });
  });

  describe('#getSessionTimeout', () => {
    it('should call getSessionTimeout from native SDK', async () => {
      const timeout = 1200;
      NativeModules.PiwikProSdk.getSessionTimeout.mockResolvedValue(timeout);
      const result = await PiwikProSdk.getSessionTimeout();

      expect(result).toStrictEqual(timeout);
    });
  });

  describe('#startNewSession', () => {
    it('should call startNewSession from native SDK', async () => {
      await PiwikProSdk.startNewSession();

      expect(NativeModules.PiwikProSdk.startNewSession).toHaveBeenCalled();
    });
  });

  describe('#dispatch', () => {
    it('should call dispatch from native SDK', async () => {
      await PiwikProSdk.dispatch();

      expect(NativeModules.PiwikProSdk.dispatch).toHaveBeenCalled();
    });
  });

  describe('#setDispatchInterval', () => {
    it('should call setDispatchInterval from native SDK', async () => {
      await PiwikProSdk.setDispatchInterval(5);

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).toHaveBeenCalledWith(5);
    });

    it('should throw an error if setDispatchInterval was called with float number', async () => {
      await expect(() => PiwikProSdk.setDispatchInterval(5.1)).rejects.toThrow(
        new Error('Parameter must be an integer number')
      );

      expect(
        NativeModules.PiwikProSdk.setDispatchInterval
      ).not.toHaveBeenCalled();
    });
  });

  describe('#getDispatchInterval', () => {
    it('should call getDispatchInterval from native SDK', async () => {
      NativeModules.PiwikProSdk.getDispatchInterval.mockResolvedValue(5);
      const result = await PiwikProSdk.getDispatchInterval();

      expect(result).toStrictEqual(5);
    });
  });

  describe('#setIncludeDefaultCustomVariables', () => {
    it('should call setIncludeDefaultCustomVariables from native SDK', async () => {
      await PiwikProSdk.setIncludeDefaultCustomVariables(false);

      expect(
        NativeModules.PiwikProSdk.setIncludeDefaultCustomVariables
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#getIncludeDefaultCustomVariables', () => {
    it('should call getIncludeDefaultCustomVariables from native SDK', async () => {
      NativeModules.PiwikProSdk.getIncludeDefaultCustomVariables.mockResolvedValue(
        false
      );
      const result = await PiwikProSdk.getIncludeDefaultCustomVariables();

      expect(result).toStrictEqual(false);
    });
  });

  describe('#setAnonymizationState', () => {
    it('should call setAnonymizationState from native SDK', async () => {
      await PiwikProSdk.setAnonymizationState(false);

      expect(
        NativeModules.PiwikProSdk.setAnonymizationState
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('#isAnonymizationOn', () => {
    it('should call isAnonymizationOn from native SDK', async () => {
      NativeModules.PiwikProSdk.isAnonymizationOn.mockResolvedValue(true);
      const result = await PiwikProSdk.isAnonymizationOn();

      expect(result).toStrictEqual(true);
    });
  });

  describe('#setOptOut', () => {
    it('should call setOptOut from native SDK', async () => {
      await PiwikProSdk.setOptOut(false);

      expect(NativeModules.PiwikProSdk.setOptOut).toHaveBeenCalledWith(false);
    });
  });

  describe('#getOptOut', () => {
    it('should call getOptOut from native SDK', async () => {
      NativeModules.PiwikProSdk.getOptOut.mockResolvedValue(true);
      const result = await PiwikProSdk.getOptOut();

      expect(result).toStrictEqual(true);
    });
  });

  describe('#setDryRun', () => {
    it('should call setDryRun from native SDK', async () => {
      const dryRun = true;
      await PiwikProSdk.setDryRun(dryRun);

      expect(NativeModules.PiwikProSdk.setDryRun).toHaveBeenCalledWith(dryRun);
    });
  });

  describe('#setPrefixing', () => {
    it('should call setPrefixing from native SDK', async () => {
      await PiwikProSdk.setPrefixing(false);

      expect(NativeModules.PiwikProSdk.setPrefixing).toHaveBeenCalledWith(
        false
      );
    });
  });

  describe('#isPrefixingOn', () => {
    it('should call isPrefixingOn from native SDK', async () => {
      NativeModules.PiwikProSdk.isPrefixingOn.mockResolvedValue(true);
      const result = await PiwikProSdk.isPrefixingOn();

      expect(result).toStrictEqual(true);
    });
  });
});
