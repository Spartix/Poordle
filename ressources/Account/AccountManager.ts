import AsyncStorage from "@react-native-async-storage/async-storage";
import * as fs from "react-native-fs";
import { Event } from "../interfaces/Event";
import { ReleveNoteResponse } from "../interfaces/ReleveNoteResponse";
export class AccountManager {
  public static async login(
    username: string,
    password: string
  ): Promise<boolean> {
    if (await this.isLoggedIn()) return Promise.resolve(true);
    const csrfToken = await this.getCSRFToken();

    if (!csrfToken) {
      console.error("CSRF token not found");
      return Promise.reject(new Error("CSRF token not found"));
    }

    const response = await fetch(
      "https://cas.univ-lille.fr/login?service=https%3A%2F%2Fmoodle.univ-lille.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
        body: `username=${username}&password=${password}&execution=${csrfToken}&_eventId=submit`,
      }
    );
    return Promise.resolve(this.isLoggedIn());
  }
  public static logout(): Promise<void> {
    return AsyncStorage.removeItem("user");
  }
  public static async isLoggedIn(): Promise<boolean> {
    const response = await fetch(
      "https://cas.univ-lille.fr/login?service=https%3A%2F%2Fmoodle.univ-lille.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS",
      {
        method: "GET",
        headers: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );
    return Promise.resolve(
      response.url.includes("https://moodle.univ-lille.fr/my")
    );
  }
  private static async getCSRFToken(): Promise<string | undefined> {
    const response = await fetch(
      "https://cas.univ-lille.fr/login?service=https%3A%2F%2Fmoodle.univ-lille.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS",
      {
        method: "GET",
        headers: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );
    const html = await response.text();
    //console.log(AsyncStorage.getAllKeys());
    const csrfTokenMatch = html
      .split(`<input type="hidden" name="execution" value="`)[1]
      ?.split(`"`)[0];
    return csrfTokenMatch;
  }
  public static async getEvent(): Promise<Event[]> {
    const response = await fetch(
      "https://cas.univ-lille.fr/login?service=https%3A%2F%2Fmoodle.univ-lille.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS",
      {
        method: "GET",
        headers: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );
    const html = await response.text();
    // parse all div with class "event"
    const eventMatch = html.match(
      /<div class="event d-flex border-bottom pt-2 pb-3" data-eventtype-course="1" data-region="event-item">.*?<\/div>\s*<\/div>/gs
    );
    //console.log(this.parseMoodleEvents(eventMatch || []));

    return this.parseMoodleEvents(eventMatch || []);
  }
  private static parseMoodleEvents(texts: string[]): Event[] {
    return texts.map((text) => {
      const nomMatch = text.match(
        /<h6[^>]*>\s*<a[^>]*?href="([^"]+)"[^>]*>(.*?)<\/a>/
      );
      const dateMatch = text.match(
        /<div class="date small"><a[^>]*>(.*?)<\/a>,\s*(.*?)<\/div>/
      );
      return new Event(
        nomMatch?.[2]?.trim() || "Nom de l'événement",
        dateMatch?.[1]?.trim() || "Date de l'événement",
        dateMatch?.[2]?.trim() || "Heure de l'événement",
        nomMatch?.[1] || "Lien de l'événement"
      );
    });
  }
  public static async getReleveNotes(): Promise<ReleveNoteResponse> {
    await this.loginReleve();
    const response = await fetch(
      "https://iuta-bulletin.univ-lille.fr/services/data.php?q=dataPremi%C3%A8reConnexion",
      {
        method: "POST",
        headers: {
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      }
    );
    const data = await response.json();
    return data as ReleveNoteResponse;
  }
  private static async loginReleve() {
    return await fetch(
      "https://iuta-bulletin.univ-lille.fr/services/doAuth.php?href=https%3A%2F%2Fiuta-bulletin.univ-lille.fr%2F",
      {
        method: "GET",
      }
    );
  }
  
}
