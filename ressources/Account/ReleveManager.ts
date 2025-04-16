import { encode } from "base64-arraybuffer";
import {
  Evaluations,
  ReleveNoteResponse,
  Ressource,
} from "../interfaces/ReleveNoteResponse";

export class ReleveManager {
  private releveDeNote: ReleveNoteResponse;
  constructor(releve: ReleveNoteResponse) {
    this.releveDeNote = releve;
  }
  public getReleveDeNote(): ReleveNoteResponse {
    return this.releveDeNote;
  }
  public getRessourceByName(name: string): Ressource[string] {
    const key = Object.keys(this.releveDeNote.relevé.ressources).find(
      (k) => k.trim() === name.trim()
    );
    if (!key) throw new Error(`Ressource ${name} not found`);
    return this.releveDeNote.relevé.ressources[key];
  }

  public getRessourceNames(): string[] {
    return Object.keys(this.releveDeNote.relevé.ressources);
  }
  public static getMoyenneFromRessource(
    ressourceName: Ressource[string]
  ): number {
    let moyenne = 0;
    let coef = 0;
    ressourceName.evaluations.forEach((evaluation) => {
      //console.log(evaluation.note.value);
      if (evaluation.note.value !== "~") {
        moyenne +=
          parseFloat(evaluation.note.value) * parseFloat(evaluation.coef);
        coef += parseFloat(evaluation.coef);
      }
    });
    return moyenne / coef || 0;
  }
  public static getEvaluationFromRessource(
    ressourceName: Ressource[string]
  ): Evaluations {
    return ressourceName.evaluations;
  }
  public getGroupe(): string {
    return this.releveDeNote.relevé.semestre.groupes[0].group_name;
  }
  public async getAvatar(): Promise<string> {
    console.log("Fetching avatar...");
    const imageUrl =
      "https://iuta-bulletin.univ-lille.fr/services/data.php?q=getStudentPic";
    const response = await fetch(imageUrl, {
      method: "GET",
      headers: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch avatar: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = encode(arrayBuffer);
    //console.log("Base64 conversion done");
    return "data:image/jpeg;base64," + base64;
  }
}
