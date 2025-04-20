import React from "react";
import { ReleveContext } from "~/app/_layout";
import { UES } from "~/ressources/interfaces/ReleveNoteResponse";
import { Text } from "~/components/ui/text";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react-native";
export default function UesScreen() {
  const { manager } = React.useContext(ReleveContext)!;
  if (!manager) return null;
  const [ues, setUes] = React.useState<UES>(manager.ues);
  console.log(ues);
  // Object.keys(ues).map((element, index) => {
  //   console.log("Element: ", element);
  // });

  return (
    <ScrollView>
      {Object.keys(ues).map((element, index) => {
        return <UeComposant UE={ues[element]} key={index} />;
      })}
    </ScrollView>
  );
}

function UeComposant({ UE }: { UE: UES[string] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible
      className="bg-cyan-600 rounded-lg m-2 pt-4 pr-4"
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger className="flex flex-col mb-4 ">
        <View className="flex flex-row items-center w-full">
          <Text className="pl-4">{UE.titre}</Text>

          <Text className="ml-auto">{UE.moyenne.value}</Text>
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
          {/* {UE.saes.map((evaluation) => {
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
          })} */}
        </View>
      </CollapsibleContent>
    </Collapsible>
  );
}
