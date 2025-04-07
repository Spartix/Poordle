import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AccountManager } from "~/ressources/Account/AccountManager";
export default function BulletinScreen() {
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
          AccountManager.getReleveNotes().then((releve) => {
            console.log("Releve: ", releve);
          });
        }}
      ></Button>
    </View>
  );
}
