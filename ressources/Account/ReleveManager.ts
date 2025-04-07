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
      console.log(evaluation.note.value);
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
}
