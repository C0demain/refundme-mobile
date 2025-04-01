import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message'; 
import { useColorScheme } from '@/src/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light"><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login/index" options={{ title: "Login" }}/>
          <Stack.Screen name="+not-found" options={{ title: "Página não encontrada" }}/>
          <Stack.Screen name="refund/index" options={{ title: "Cadastro de Reembolso" }}  />
          <Stack.Screen name="expenses/index" options={{ title: "Reembolsos" }}  />
        </Stack>
        <Toast />
        <StatusBar style="auto" />
      </ThemeProvider></GluestackUIProvider>
  );
}
