import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import BulletinScreen from "./Bulletin/Bulletin";
import React, { useEffect, useState } from "react";
import { ReleveManager } from "~/ressources/Account/ReleveManager";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { Calendar, EllipsisVertical, FileText } from "lucide-react-native";
import { ReleveContext } from "../_layout";
import AbsencesScreen from "./Absences/Absences";
const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { setManager: setContextManager } = React.useContext(ReleveContext)!;
  useEffect(() => {
    const fetchReleve = async () => {
      const notes = await AccountManager.getReleveNotes();
      const releveManager = new ReleveManager(notes);
      console.log("ReleveManager initialized");
      return setContextManager(releveManager);
    };
    fetchReleve();
  }, []);
  return (
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
      <Tab.Screen
        name="Absences"
        component={AbsencesScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <EllipsisVertical size={24} color={color} strokeWidth={1} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
