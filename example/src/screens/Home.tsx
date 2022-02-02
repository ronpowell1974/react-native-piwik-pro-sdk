import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { Button, ScrollViewContainer } from '../components';
import {
  setDispatchInterval,
  setError,
  setMessage,
  setSdkInitializationState,
  setUserEmail,
  setUserId,
} from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';

export default function Home({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const initializePiwikProSdk = async () => {
    await PiwikProSdk.init(
      'https://your.piwik.pro.server.com',
      '01234567-89ab-cdef-0123-456789abcdef'
    )
      .then(() => dispatch(setMessage('Success')))
      .catch((error) => dispatch(setError(error.message)));

    const dispatchInterval = await PiwikProSdk.getDispatchInterval();
    dispatch(setDispatchInterval(dispatchInterval));
    const currentUserId = await PiwikProSdk.getUserId();
    dispatch(setUserId(currentUserId));
    const currentUserEmail = await PiwikProSdk.getUserEmail();
    dispatch(setUserEmail(currentUserEmail));
    dispatch(setSdkInitializationState(true));
  };

  return (
    <ScrollViewContainer>
      <Button
        onPress={initializePiwikProSdk}
        text={'Initialize Piwik Pro SDK'}
      />

      <Button
        onPress={() => navigation.navigate('Tracking Actions')}
        text={'Tracking Actions'}
      />

      <Button
        onPress={() => navigation.navigate('Audience Manager')}
        text={'Audience Manager'}
      />

      <Button
        onPress={() => navigation.navigate('Settings')}
        text={'Settings'}
      />
    </ScrollViewContainer>
  );
}

type RootStackParamList = {
  'Home': undefined;
  'Settings': undefined;
  'Audience Manager': undefined;
  'Tracking Actions': undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
