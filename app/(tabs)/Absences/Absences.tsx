import React from "react";
import { View } from "react-native";
import { ReleveContext } from "~/app/_layout";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
export default function AbsencesScreen() {
  const { manager } = React.useContext(ReleveContext)!;
  if (!manager) return null;
  return (
    <View>
      <Card>
        <CardContent></CardContent>
        <CardFooter>
          <Text>Absences : {manager.totalAbs.absent.compte}</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
