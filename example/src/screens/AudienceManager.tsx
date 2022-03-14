import React, { useState } from 'react';
import PiwikProSdk from '@piwikpro/react-native-piwik-pro-sdk';
import { Button, Input, ScrollViewContainer } from '../components';
import { setError, setMessage } from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';

export default function AudienceManager() {
  const dispatch = useAppDispatch();
  const [audienceId, setAudienceId] = useState<string>('');

  const getProfileAttributes = async () => {
    try {
      const profileAttributes = await PiwikProSdk.getProfileAttributes();
      printProfileAttributes(profileAttributes);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const checkAudienceMembership = async () => {
    try {
      const isMember = await PiwikProSdk.checkAudienceMembership(audienceId);
      dispatch(setMessage(`audience membership: ${isMember}`));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const printProfileAttributes = (profileAttributes: ProfileAttributes) => {
    let profileAttributesString = 'Profile attributes:';

    Object.entries(profileAttributes).forEach(([key, value]) => {
      profileAttributesString = profileAttributesString.concat(
        `\n- ${key}: ${value}`
      );
    });

    dispatch(setMessage(profileAttributesString));
  };

  const trackProfileAttributes = async () => {
    const profileAttributes: TrackProfileAttributes = [
      {
        name: 'food',
        value: 'pizza',
      },
      {
        name: 'drink',
        value: 'water',
      },
    ];

    try {
      await PiwikProSdk.trackProfileAttributes(profileAttributes);
      dispatch(setMessage('Track profile attributes'));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <ScrollViewContainer>
      <Button onPress={getProfileAttributes} text="Get profile attributes" />

      <Input
        value={audienceId}
        label="Audience ID"
        placeholder="Audience ID"
        onChangeText={(buttonText) => setAudienceId(buttonText)}
      />

      <Button
        onPress={checkAudienceMembership}
        text="Check audience membership"
      />

      <Button
        onPress={trackProfileAttributes}
        text="Track profile attributes"
      />
    </ScrollViewContainer>
  );
}
