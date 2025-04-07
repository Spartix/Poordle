import { Stack, useNavigation } from "expo-router";
import { View } from "react-native";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { Text } from "~/components/ui/text";
import { Progress } from "~/components/ui/progress";
import { useEffect, useState } from "react";
export default function App() {
  const [progress, setProgress] = useState(0);
  const nav = useNavigation();
  useEffect(() => {
    AccountManager.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        nav.replace("login/index");
      } else {
        nav.replace("(tabs)/index");
      }
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.floor(Math.random() * 15);
      });
    }, 650);

    return () => clearInterval(interval);
  }, []);
  return (
    <View>
      <Progress value={progress}></Progress>
    </View>
  );
}
