import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import BulletinScreen from "./Bulletin/Bulletin";
import React, { useEffect, useState } from "react";
import { ReleveManager } from "~/ressources/Account/ReleveManager";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { Calendar, EllipsisVertical, FileText } from "lucide-react-native";
const Tab = createBottomTabNavigator();

export const ReleveContext = React.createContext<ReleveManager | undefined>(
  undefined
);
export default function Tabs() {
  const [manager, setManager] = useState<ReleveManager>();
  useEffect(() => {
    const fetchReleve = async () => {
      const notes = await AccountManager.getReleveNotes();
      const releveManager = new ReleveManager(notes);
      console.log("ReleveManager initialized");
      return setManager(releveManager);
    };
    fetchReleve();
  }, []);
  return (
    <ReleveContext.Provider value={manager}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Evenements"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <Calendar size={24} color={color} strokeWidth={1} />
            ),
          }}
        />
        <Tab.Screen
          name="Bulletin"
          component={BulletinScreen}
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <FileText size={24} color={color} strokeWidth={1} />
            ),
          }}
        />
      </Tab.Navigator>
    </ReleveContext.Provider>
  );
}
