import React, { useEffect, useState } from 'react';
import PiwikProSdk from 'react-native-piwik-pro-sdk';
import {
  dispatchIntervalSelector,
  sdkInitializedSelector,
  sessionTimeoutSelector,
  setDispatchInterval,
  setError,
  setMessage,
  setSessionTimeout,
  setUserEmail,
  setUserId,
  setVisitorId,
  userEmailSelector,
  userIdSelector,
  visitorIdSelector,
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Button, Input, ScrollViewContainer } from '../components';

export default function Settings() {
  const dispatch = useAppDispatch();
  const successMessage = (message: string) => dispatch(setMessage(message));
  const dispatchInterval = useAppSelector(dispatchIntervalSelector);
  const sdkInitialized = useAppSelector(sdkInitializedSelector);
  const userId = useAppSelector(userIdSelector);
  const userEmail = useAppSelector(userEmailSelector);
  const sessionTimeout = useAppSelector(sessionTimeoutSelector);
  const visitorId = useAppSelector(visitorIdSelector);
  const [anonymizationEnabled, setAnonymizationEnabled] =
    useState<boolean>(true);
  const [includeDefaultCustomVariables, setIncludeDefaultCustomVariables] =
    useState<boolean>(true);
  const [optOut, setOptOut] = useState<boolean>(false);
  const [prefixingEnabled, setPrefixingEnabled] = useState<boolean>(true);
  const [dryRun, setDryRun] = useState<boolean>(false);

  useEffect(() => {
    if (sdkInitialized) {
      getAnonymizationState();
      getIncludeDefaultCustomVariablesState();
      getOptOutState();
      getPrefixingState();
      getDryRunState();
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

  const getDryRunState = async () => {
    const currentDryRunState = await PiwikProSdk.getDryRun();
    setDryRun(currentDryRunState);
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

  const changeSessionTimeout = async () => {
    try {
      await PiwikProSdk.setSessionTimeout(sessionTimeout);
      successMessage('Session timeout changed successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const changeUserEmail = async () => {
    try {
      await PiwikProSdk.setUserEmail(userEmail);
      successMessage('User email changed successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const changeUserId = async () => {
    try {
      await PiwikProSdk.setUserId(userId);
      successMessage('User ID changed successfully');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const changeVisitorId = async () => {
    try {
      await PiwikProSdk.setVisitorId(visitorId);
      successMessage('Visitor ID changed successfully');
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

  const startNewSession = async () => {
    try {
      await PiwikProSdk.startNewSession();
      successMessage('New session started');
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  const toggleDryRun = async () => {
    try {
      await PiwikProSdk.setDryRun(!dryRun);
      const currentDryRunState = await PiwikProSdk.getDryRun();
      setDryRun(currentDryRunState);
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

  return (
    <ScrollViewContainer>
      <Button onPress={dispatchEvents} text="Dispatch events" />

      <Input
        value={dispatchInterval.toString()}
        label="Dispatch interval (in seconds)"
        placeholder="Dispatch interval (in seconds)"
        keyboardType="numeric"
        onChangeText={(buttonText) =>
          dispatch(setDispatchInterval(parseInt(buttonText, 10) || 0))
        }
      />
      <Button onPress={changeDispatchInterval} text="Set dispatch interval" />

      <Input
        value={sessionTimeout.toString()}
        label="Session timeout (in seconds)"
        placeholder="Session timeout (in seconds)"
        keyboardType="numeric"
        onChangeText={(buttonText) =>
          dispatch(setSessionTimeout(parseInt(buttonText, 10) || 0))
        }
      />
      <Button onPress={changeSessionTimeout} text="Set session timeout" />

      <Button onPress={startNewSession} text={'Start new session'} />

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
        onPress={toggleDryRun}
        text={`Toggle dry run state, current: ${
          dryRun ? 'enabled' : 'disabled'
        }`}
      />

      <Button
        onPress={togglePrefixingState}
        text={`Toggle prefixing state, current: ${
          prefixingEnabled ? 'enabled' : 'disabled'
        }`}
      />

      <Input
        value={userEmail}
        label="User email"
        placeholder="User email"
        onChangeText={(buttonText) => dispatch(setUserEmail(buttonText))}
      />
      <Button onPress={changeUserEmail} text="Set email" />

      <Input
        value={userId}
        label="User ID"
        placeholder="User ID"
        onChangeText={(buttonText) => dispatch(setUserId(buttonText))}
      />
      <Button onPress={changeUserId} text="Set user ID" />

      <Input
        value={visitorId}
        label="Visitor ID"
        placeholder="Visitor ID"
        onChangeText={(buttonText) => dispatch(setVisitorId(buttonText))}
      />
      <Button onPress={changeVisitorId} text="Set visitor ID" />
    </ScrollViewContainer>
  );
}
