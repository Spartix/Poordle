import {
  ArrowBigDown,
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Text } from "~/components/ui/text";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { ReleveManager } from "~/ressources/Account/ReleveManager";
import { Ressource } from "~/ressources/interfaces/ReleveNoteResponse";
import { useContext } from "react";
import { ReleveContext } from "../index"; // adapte le chemin


export default function BulletinScreen() {
  //const [manager, setManager] = useState<ReleveManager | null>(null);
  const manager = useContext(ReleveContext)
  return (
    <ScrollView>
      <Card className="m-2 rounded-lg">
        <CardHeader>
          <CardTitle>Ressources</CardTitle>
          <CardDescription>Synthese des notes par ressource</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollView>
            {manager &&
              manager.getRessourceNames().length > 0 &&
              manager.getRessourceNames().map((ressourceName) => {
                const ressource = manager.getRessourceByName(ressourceName);
                return (
                  <RessourceComposant
                    Ressource={ressource}
                    key={ressource.id}
                  />
                );
              })}
          </ScrollView>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

function RessourceComposant({ Ressource }: { Ressource: Ressource[string] }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      className="bg-green-600 rounded-lg m-2 pt-4 pr-4"
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger className="flex flex-col mb-4 ">
        <View className="flex flex-row items-center w-full">
          <Text className="pl-4">{Ressource.titre}</Text>

          <Text className="ml-auto">
            {ReleveManager.getMoyenneFromRessource(Ressource)}
          </Text>
        </View>
        <View className="absolute right-1/2 bottom-0 rounded-lg left-1/2 transform translate-y-1/2 translate-x-1/2">
          {open ? (
            <ChevronDown size={24} strokeWidth={0.5} color={"gray"} />
          ) : (
            <ChevronUp size={24} strokeWidth={0.5} color={"gray"} />
          )}
        </View>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col justify-between items-start w-full">
        <View className="bg-cyan-800 rounded-lg p-4 w-full">
          {Ressource.evaluations.map((evaluation) => {
            return (
              <View
                key={evaluation.id}
                className="flex flex-row justify-between items-center w-full"
              >
                <Text>{evaluation.description}</Text>
                <Text>{evaluation.note.value}</Text>
                <Text>{evaluation.coef}</Text>
              </View>
            );
          })}
        </View>
      </CollapsibleContent>
    </Collapsible>
  );
}
