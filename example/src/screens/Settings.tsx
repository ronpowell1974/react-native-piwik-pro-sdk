import React, { useEffect, useState } from 'react';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import {
  dispatchIntervalSelector,
  sdkInitializedSelector,
  setDispatchInterval,
  setError,
  setMessage,
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { styles } from '../styles';
import { Input } from 'react-native-elements';
import { Button, ScrollViewContainer } from '../components';

export default function Settings() {
  const dispatch = useAppDispatch();
  const successMessage = (message: string) => dispatch(setMessage(message));
  const dispatchInterval = useAppSelector(dispatchIntervalSelector);
  const sdkInitialized = useAppSelector(sdkInitializedSelector);
  const [anonymizationEnabled, setAnonymizationEnabled] =
    useState<boolean>(true);
  const [includeDefaultCustomVariables, setIncludeDefaultCustomVariables] =
    useState<boolean>(true);
  const [optOut, setOptOut] = useState<boolean>(false);
  const [prefixingEnabled, setPrefixingEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (sdkInitialized) {
      getAnonymizationState();
      getIncludeDefaultCustomVariablesState();
      getOptOutState();
      getPrefixingState();
    }
  }, [sdkInitialized]);

  const getAnonymizationState = async () => {
    const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
    setAnonymizationEnabled(currentAnonymizationState);
  };

  const getIncludeDefaultCustomVariablesState = async () => {
    const includeCustomVariables =
      await PiwikProSdk.getIncludeDefaultCustomVariables();
    setIncludeDefaultCustomVariables(includeCustomVariables);
  };

  const getOptOutState = async () => {
    const currentOptOutState = await PiwikProSdk.getOptOut();
    setOptOut(currentOptOutState);
  };

  const getPrefixingState = async () => {
    const currentPrefixingState = await PiwikProSdk.isPrefixingOn();
    setPrefixingEnabled(currentPrefixingState);
  };

  const dispatchEvents = async () => {
    try {
      await PiwikProSdk.dispatch();
      successMessage('Dispatched successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const changeDispatchInterval = async () => {
    try {
      await PiwikProSdk.setDispatchInterval(dispatchInterval);
      successMessage('Dispatch interval changed successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleAnonymizationState = async () => {
    try {
      await PiwikProSdk.setAnonymizationState(!anonymizationEnabled);
      const currentAnonymizationState = await PiwikProSdk.isAnonymizationOn();
      setAnonymizationEnabled(currentAnonymizationState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleIncludeDefaultCustomVariables = async () => {
    try {
      await PiwikProSdk.setIncludeDefaultCustomVariables(
        !includeDefaultCustomVariables
      );
      const includeCustomVariables =
        await PiwikProSdk.getIncludeDefaultCustomVariables();
      setIncludeDefaultCustomVariables(includeCustomVariables);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleOptOut = async () => {
    try {
      await PiwikProSdk.setOptOut(!optOut);
      const currentOptOutState = await PiwikProSdk.getOptOut();
      setOptOut(currentOptOutState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const togglePrefixingState = async () => {
    try {
      await PiwikProSdk.setPrefixing(!prefixingEnabled);
      const currentPrefixingState = await PiwikProSdk.isPrefixingOn();
      setPrefixingEnabled(currentPrefixingState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <ScrollViewContainer>
      <Button onPress={dispatchEvents} text={'Dispatch events'} />

      <Input
        value={dispatchInterval.toString()}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        label="Dispatch interval (in seconds)"
        autoCompleteType={undefined}
        keyboardType={'numeric'}
        onChangeText={(buttonText) =>
          dispatch(setDispatchInterval(parseInt(buttonText, 10) || 0))
        }
      />

      <Button onPress={changeDispatchInterval} text={'Set dispatch interval'} />

      <Button
        onPress={toggleAnonymizationState}
        text={`Toggle anonymization state, current: ${
          anonymizationEnabled ? 'enabled' : 'disabled'
        }`}
      />

      <Button
        onPress={toggleIncludeDefaultCustomVariables}
        text={`Toggle include default custom variables state, current: ${
          includeDefaultCustomVariables ? 'enabled' : 'disabled'
        }`}
      />

      <Button
        onPress={toggleOptOut}
        text={`Toggle opt out state, current: ${
          optOut ? 'enabled' : 'disabled'
        }`}
      />

      <Button
        onPress={togglePrefixingState}
        text={`Toggle prefixing state, current: ${
          prefixingEnabled ? 'enabled' : 'disabled'
        }`}
      />
    </ScrollViewContainer>
  );
}
