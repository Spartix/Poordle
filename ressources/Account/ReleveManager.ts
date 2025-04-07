import {
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
}
