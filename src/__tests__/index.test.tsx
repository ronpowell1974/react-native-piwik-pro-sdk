import { NativeModules } from 'react-native';
import PiwikProSdk from '../';

jest.mock('react-native', () => ({
  NativeModules: {
    PiwikProSdk: {
      init: jest.fn(),
    },
  },
  Platform: {
    select: jest.fn(),
  },
}));

describe('init', () => {
  it('calls init from native SDK', async () => {
    const apiUrl = 'https://example.com';
    const siteId = '1111-2222-3333-dddd';

    await PiwikProSdk.init(apiUrl, siteId);

    expect(NativeModules.PiwikProSdk.init).toHaveBeenCalledWith(apiUrl, siteId);
  });
});
