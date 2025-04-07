import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { ReleveManager } from "~/ressources/Account/ReleveManager";
export default function BulletinScreen() {
  const [manager, setManager] = useState<ReleveManager | null>(null);
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bulletin</Text>
      <Button
        onPress={() => {
          console.log(
            manager?.getRessourceByName(manager?.getRessourceNames()[0]).titre
          );
          console.log(manager?.getRessourceNames());
        }}
      ></Button>
    </View>
  );
}

