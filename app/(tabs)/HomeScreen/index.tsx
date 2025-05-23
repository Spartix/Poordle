import { Linking, ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AccountManager } from "~/ressources/Account/AccountManager";
import { Text } from "~/components/ui/text";
import { useEffect, useState } from "react";
import { Event } from "~/ressources/interfaces/Event";
import { Progress } from "~/components/ui/progress";
import { useContext } from "react";
import { ReleveContext } from "../../_layout"; // adapte le chemin

function EventBlock() {
  const context = useContext(ReleveContext);
  if (!context) return null;

  const { manager } = context;

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const event = await AccountManager.getEvent();
      //console.log("Event: ", event);
      if (event) {
        setEvents(event);
      }
    }
    fetchEvents();
  }, []);

  return (
    <View>
      {manager &&
        events
          .filter(
            (elt) =>
              elt.nom.includes(manager.getGroupe()) ||
              !elt.nom.toLocaleLowerCase().includes("groupe")
          )
          .map((e: Event) => (
            <Card key={e.id}>
              <CardHeader>
                <CardTitle>{e.date}</CardTitle>
                <CardDescription>{e.nom}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant={"secondary"}
                  onPress={() => {
                    // open browser with url
                    Linking.openURL(
                      decodeURIComponent(e.lien.replace(/&amp;/g, "&"))
                    );
                  }}
                >
                  <Text>Remettre</Text>
                </Button>
              </CardContent>
            </Card>
          ))}
    </View>
  );
}

export default function HomeScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (interval) clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15);
      });
    }, 300);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <ScrollView>
      <View>
        {progress < 100 && (
          <Progress
            value={progress}
            style={{
              display: "flex",
            }}
          />
        )}
        <Card>
          <CardHeader>
            <CardTitle>Evenements à venir</CardTitle>
            <CardDescription>Liste des événements à venir</CardDescription>
          </CardHeader>
          <CardContent>
            <EventBlock />
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
