import "~/global.css";
import Toast, { ToastConfig } from "react-native-toast-message";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, Pressable } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertTriangle, CheckSquare, Info } from "lucide-react-native";
import { ReleveManager } from "~/ressources/Account/ReleveManager";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/core";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
type Theme = typeof ThemeProvider;
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
export const ReleveContext = React.createContext<
  | {
      manager: ReleveManager | undefined;
      setManager: React.Dispatch<
        React.SetStateAction<ReleveManager | undefined>
      >;
    }
  | undefined
>(undefined);
export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const [manager, setManager] = React.useState<ReleveManager | undefined>();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await manager?.getAvatar();
      avatar && setAvatar(avatar);
      //console.log("Avatar: ", avatar);
    };
    fetchAvatar();
  }, [manager]);
  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  const TOAST_CONFIG: ToastConfig = {
    success: ({
      text1,
      text2,
      onPress,
      props: { icon = CheckSquare },
    }: any) => (
      <Pressable onPress={onPress} className="w-full max-w-xl px-6">
        <Alert icon={icon} variant={"success"}>
          <AlertTitle>{text1}</AlertTitle>
          <AlertDescription>{text2}</AlertDescription>
        </Alert>
      </Pressable>
    ),
    error: ({
      text1,
      text2,
      onPress,
      props: { icon = AlertTriangle },
    }: any) => (
      <Pressable onPress={onPress} className="w-full max-w-xl px-6">
        <Alert icon={icon} variant="destructive">
          <AlertTitle>{text1}</AlertTitle>
          <AlertDescription>{text2}</AlertDescription>
        </Alert>
      </Pressable>
    ),
    base: ({ text1, text2, onPress, props: { icon = Info } }: any) => (
      <Pressable onPress={onPress} className="w-full max-w-xl px-6">
        <Alert icon={icon} variant="default">
          <AlertTitle>{text1}</AlertTitle>
          <AlertDescription>{text2}</AlertDescription>
        </Alert>
      </Pressable>
    ),
  };
  return (
    <ReleveContext.Provider value={{ manager, setManager }}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "PoorDle",
              headerRight: () => <ThemeToggle />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="(tabs)/index"
            options={{
              headerShown: true,
              headerTitle: "PoorDle",
              headerTitleAlign: "center",
              headerRight: () => (
                <>
                  {/* <Button
                    onPressIn={async () => {
                      console.log(await manager?.getAvatar());
                    }}
                  ></Button> */}
                  <Avatar alt="avatar" className="mr-2">
                    {avatar && (
                      <AvatarImage
                        source={{
                          uri: avatar,
                        }}
                        onError={(error) => {
                          console.log("Image load error:", error.nativeEvent);
                        }}
                        onLoad={() => console.log("Image loaded successfully")}
                      />
                    )}
                  </Avatar>
                  <ThemeToggle />
                </>
              ),
            }}
          />
          <Stack.Screen
            name="login/index"
            options={{
              headerShown: true,
              headerTitle: "PoorDle Login",
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Stack>
        <Toast config={TOAST_CONFIG} />
        <PortalHost />
      </ThemeProvider>
    </ReleveContext.Provider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
