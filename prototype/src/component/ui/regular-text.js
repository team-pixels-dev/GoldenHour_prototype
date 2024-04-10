import { useCallback } from 'react';
import {View, Text, StyleSheet} from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { wScale } from '../../utils/scaling';

export default function Label({ children, style }) {
  const [fontsLoaded, fontError] = useFonts({
    'Pretendard-Regular': require('../../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Bold': require('../../assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('../../assets/fonts/Pretendard-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Text style={[styles.base, style]} onLayout={onLayoutRootView}>{children}</Text>
  );
}

const styles = StyleSheet.create({
    base: {
      fontSize: wScale(28),
      fontWeight: "500",
      fontFamily: "Pretendard-Regular",
    }
  });