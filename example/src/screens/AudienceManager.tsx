import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import { Button, ScrollViewContainer } from '../components';
import { setError, setMessage } from '../store/appSlice';
import { useAppDispatch } from '../store/hooks';
import { styles } from '../styles';

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

  return (
    <ScrollViewContainer>
      <Button onPress={getProfileAttributes} text={'Get profile attributes'} />

      <Input
        value={audienceId}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        label="Audience ID"
        placeholder="Audience ID"
        onChangeText={(buttonText) => setAudienceId(buttonText)}
        autoCompleteType={undefined}
      />

      <Button
        onPress={checkAudienceMembership}
        text={'Check audience membership'}
      />
    </ScrollViewContainer>
  );
}
