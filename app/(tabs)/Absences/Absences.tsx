import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { ReleveContext } from "~/app/_layout";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { Absences } from "~/ressources/interfaces/ReleveNoteResponse";
export default function AbsencesScreen() {
  const { manager } = React.useContext(ReleveContext)!;
  if (!manager) return null;
  const [absences, setAbsences] = React.useState<Absences[string][]>();
  useEffect(() => {
    const fetchAbsences = () => {
      const absences = manager.getAbsences();
      setAbsences(absences);
    };
    fetchAbsences();
  }, []);
  return (
    <View>
      <Card>
        <CardContent>
          {/* <Button onPressIn={() => manager.getAbsences()}>
            <Text>open</Text>
          </Button> */}
          <ScrollView>
            <Table>
              <TableHeader className="">
                <TableRow className="">
                  <TableHead className="w-1/5">
                    <Text>Status</Text>
                  </TableHead>
                  <TableHead className="w-1/5">
                    <Text>Date</Text>
                  </TableHead>
                  <TableHead className="w-2/6">
                    <Text>Heures</Text>
                  </TableHead>
                  <TableHead className="w-1/5">
                    <Text>Enseignant</Text>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {absences?.map((absence, index) => {
                  return absence.map((abs, idx) => {
                    return (
                      <TableRow key={index + idx} className="space-x-3">
                        <TableCell
                          className={`w-1/5 ${
                            abs.justifie ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          <Text>
                            {abs.justifie
                              ? "Justifié"
                              : abs.statut.charAt(0).toLocaleUpperCase() +
                                abs.statut.substring(1)}
                          </Text>
                        </TableCell>
                        <TableCell className={`w-1/5`}>
                          <Text>{abs.dateFin}</Text>
                        </TableCell>
                        <TableCell className={`w-2/6`}>
                          <Text>
                            {Math.floor(abs.debut)}h
                            {((abs.debut % 1) * 60).toString().padStart(2, "0")}{" "}
                            - {Math.floor(abs.fin)}h
                            {((abs.fin % 1) * 60).toString().padStart(2, "0")}
                          </Text>
                        </TableCell>
                        <TableCell className={`w-1/5`}>
                          <Text>
                            {abs.enseignant
                              .split(".")[1]
                              .charAt(0)
                              .toLocaleUpperCase() +
                              abs.enseignant.split(".")[1].substring(1)}
                          </Text>
                        </TableCell>
                      </TableRow>
                    );
                  });
                })}
              </TableBody>
            </Table>
          </ScrollView>
        </CardContent>
        <CardFooter>
          <Text>Total Absences: {manager.totalAbs.absent.compte}</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
